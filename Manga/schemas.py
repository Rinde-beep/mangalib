from pydantic import BaseModel
from enum import Enum
from sqlalchemy import BLOB, JSON
class Status(Enum):
    finished = "издано"
    ongoing = "выходит"
    stopped = "приостановлено"

class Manga(BaseModel):
    id: int | None = None
    preview_picture_id: str | None = None
    name: str
    alternative_name: str
    description: str | None
    tags: list[str] | None
    rating: float | None
    chapter_size: int | None
    volume_size: int | None
    status: Status | None

class List(BaseModel):
    id: int | None = None
    total_list: int | None = 0
    reading: int | None = 0
    planned: int | None = 0
    completed: int | None = 0
    favorite: int | None = 0
    on_hold: int | None = 0
    dropped : int | None = 0


class Rating(BaseModel):
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

class MangaAdd(BaseModel):
    picture: bytes | None = None
    name: str
    alternative_name: str
    description: str | None
    tags: list[str] | None
    rating: float | None
    chapter_size: int | None
    volume_size: int | None
    status: Status | None

    model_config = {"extra": "forbid"}

