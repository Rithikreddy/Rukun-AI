from fastapi import FastAPI

from api.infra.log import logger

app = FastAPI(title="Rukun API")


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.get("/ready")
def ready_check() -> dict:
    logger.info("Ready check")
    return {"status": "ready"}
