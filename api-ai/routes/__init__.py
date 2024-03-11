"""
Author: cheesecat47 <cheesecat47@gmail.com>
"""

from fastapi import APIRouter
from routes import analysis

analysis_router = APIRouter()
analysis_router.include_router(analysis.router, tags=["ai"])

__all__ = ["analysis_router"]
