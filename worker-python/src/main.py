"""
Polyglot Application Email Notifier Worker
Polls Redis queue and processes job applications.
"""

import json
import logging
import os
import time
from datetime import datetime

import redis

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
logger = logging.getLogger("devoopsp-worker")

REDIS_HOST    = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT    = int(os.getenv("REDIS_PORT", "6379"))
POLL_INTERVAL = int(os.getenv("POLL_INTERVAL", "5"))
QUEUE_KEY     = "applications_queue"


def connect_redis(retries: int = 10, delay: int = 3) -> redis.Redis:
    for attempt in range(1, retries + 1):
        try:
            client = redis.Redis(
                host=REDIS_HOST, port=REDIS_PORT,
                decode_responses=True, socket_connect_timeout=5,
            )
            client.ping()
            logger.info("Connected to Redis at %s:%d", REDIS_HOST, REDIS_PORT)
            return client
        except redis.ConnectionError as exc:
            logger.warning("Attempt %d/%d failed: %s. Retrying in %ds...", attempt, retries, exc, delay)
            time.sleep(delay)
    raise RuntimeError(f"Could not connect to Redis after {retries} attempts.")


def process_application(payload: dict) -> None:
    name      = payload.get("Name", "Applicant")
    email     = payload.get("Email", "unknown@example.com")
    job_id    = payload.get("JobId", "N/A")
    submitted = payload.get("SubmittedAt", datetime.utcnow().isoformat())

    logger.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    logger.info("New Application Received")
    logger.info("  Applicant : %s (%s)", name, email)
    logger.info("  Job ID    : %s", job_id)
    logger.info("  Submitted : %s", submitted)
    logger.info("  Action    : Email notification sent")
    logger.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")


def run_worker(client: redis.Redis) -> None:
    logger.info("Worker started. Polling '%s' every %ds...", QUEUE_KEY, POLL_INTERVAL)
    while True:
        try:
            result = client.blpop(QUEUE_KEY, timeout=POLL_INTERVAL)
            if result:
                _, raw = result
                try:
                    payload = json.loads(raw)
                    process_application(payload)
                except json.JSONDecodeError as exc:
                    logger.error("Bad message: %s", exc)
            else:
                logger.debug("Queue empty — waiting...")
        except redis.ConnectionError as exc:
            logger.error("Lost Redis connection: %s. Reconnecting...", exc)
            time.sleep(5)
            client = connect_redis()
        except KeyboardInterrupt:
            logger.info("Worker shutting down.")
            break


def main() -> None:
    logger.info("Polyglot Worker starting up...")
    client = connect_redis()
    run_worker(client)


if __name__ == "__main__":
    main()
