FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ ./src/
COPY tests/ ./tests/
COPY pyproject.toml .
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV POLL_INTERVAL=5
ENV PYTHONUNBUFFERED=1
CMD ["python", "src/main.py"]
