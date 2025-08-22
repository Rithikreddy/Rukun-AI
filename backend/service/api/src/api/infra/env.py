import os

from api.infra.log import logger
from dotenv import load_dotenv

load_dotenv()


def get_env(key: str, default: str = None) -> str:
    if not key:
        logger.error("Key is required")
        return None
    return os.getenv(key, default)
