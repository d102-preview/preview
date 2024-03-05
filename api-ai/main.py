from typing import Annotated

from fastapi import FastAPI, HTTPException, Path, Query, status
from loguru import logger
from models.item import Item, ReadItemByItemIdResponse

logger.info("Run server")

app = FastAPI()

items = {}


@app.get("/")
def read_root():
    return {"hello": "world"}


@app.get("/items")
def read_item() -> dict[str, Item]:
    return items


@app.get("/items/{item_id}")
def read_item_by_item_id(
    item_id: Annotated[int, Path(description="Item ID for search")],
    q: Annotated[
        str | None,
        Query(alias="q-test", description="Query string for item", max_length=10),
    ] = None,
) -> ReadItemByItemIdResponse:
    if item_id not in items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "Item not found", "item_id": item_id},
        )
    return ReadItemByItemIdResponse(id=item_id, item=items[item_id], q=q)


@app.post("/items/{item_id}", status_code=status.HTTP_201_CREATED)
def create_item(item_id: int, item: Item):
    """
    Create a new item.
    - **item_id**: Item ID
    - **item**: Item
    """
    items[item_id] = item
    return {"item_name": item.name, "item_id": item_id}
