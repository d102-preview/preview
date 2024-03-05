from datetime import datetime, timezone

from pydantic import BaseModel, Field, PrivateAttr


def datetime_now() -> datetime:
    return datetime.now(timezone.utc)


class Item(BaseModel):
    name: str = Field(description="이름")
    price: float
    is_offer: bool | None = None
    _updated_at: datetime = PrivateAttr(default_factory=datetime_now)


class ReadItemByItemIdResponse(BaseModel):
    item_id: int | None = None
    item: Item | None = None
    q: str | None = None
    message: str | None = None
