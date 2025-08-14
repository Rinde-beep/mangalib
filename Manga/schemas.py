from pydantic import BaseModel
from enum import Enum
from sqlalchemy import BLOB, JSON
class Status(Enum):
    ended = 0
    ongoing = 1
    closed = 2

class Manga(BaseModel):
    id: int | None = None
    preview_picture_id: str | None = None
    name: str
    description: str
    tags: str
    rating: float
    chapter_size: int
    volume_size: int
    status: str
    total_list: int | None = 0
    reading: int | None = 0
    planned: int | None = 0
    completed: int | None = 0
    favorite: int | None = 0
    on_hold: int | None = 0
    dropped : int | None = 0
    total_rating: int | None = 0
    rating_10: int | None = 0
    rating_9: int | None = 0
    rating_8: int | None = 0
    rating_7: int | None = 0
    rating_6: int | None = 0
    rating_5: int | None = 0
    rating_4: int | None = 0
    rating_3: int | None = 0
    rating_2: int | None = 0
    rating_1: int | None = 0

    model_config = {"extra": "forbid"}

