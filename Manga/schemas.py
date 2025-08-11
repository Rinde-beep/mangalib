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

    model_config = {"extra": "forbid"}

