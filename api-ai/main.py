"""
Author: cheesecat47 <cheesecat47@gmail.com>
"""

from core.settings import settings
from fastapi import FastAPI
from loguru import logger
from models.item import Item, ReadItemByItemIdResponse

logger.info("Run server")

app = FastAPI()
