import json
import logging
import sys
import os
import pytest
from unittest.mock import MagicMock, patch

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))
from main import process_application, connect_redis, QUEUE_KEY


class TestProcessApplication:
    def test_logs_name(self, caplog):
        with caplog.at_level(logging.INFO):
            process_application({"Name": "Ali Hassan", "Email": "ali@test.com", "JobId": "1", "SubmittedAt": "now"})
        assert "Ali Hassan" in caplog.text

    def test_logs_email(self, caplog):
        with caplog.at_level(logging.INFO):
            process_application({"Name": "Sara", "Email": "sara@test.com", "JobId": "2", "SubmittedAt": "now"})
        assert "sara@test.com" in caplog.text

    def test_logs_job_id(self, caplog):
        with caplog.at_level(logging.INFO):
            process_application({"Name": "X", "Email": "x@x.com", "JobId": "job-42", "SubmittedAt": "now"})
        assert "job-42" in caplog.text

    def test_handles_empty_payload(self, caplog):
        with caplog.at_level(logging.INFO):
            process_application({})
        assert "Applicant" in caplog.text

    def test_logs_notification_sent(self, caplog):
        with caplog.at_level(logging.INFO):
            process_application({"Name": "X", "Email": "x@x.com", "JobId": "1", "SubmittedAt": "now"})
        assert "Email notification sent" in caplog.text or "notification sent" in caplog.text.lower()


class TestConnectRedis:
    def test_raises_after_max_retries(self):
        with patch("main.redis.Redis") as mock_cls:
            mock_cls.return_value.ping.side_effect = Exception("refused")
            with pytest.raises(Exception):
                connect_redis(retries=2, delay=0)

    def test_returns_client_on_success(self):
        with patch("main.redis.Redis") as mock_cls:
            mock_cls.return_value.ping.return_value = True
            client = connect_redis(retries=1, delay=0)
            assert client is mock_cls.return_value


class TestConstants:
    def test_queue_key(self):
        assert QUEUE_KEY == "applications_queue"
