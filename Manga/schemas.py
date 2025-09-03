from pydantic import BaseModel
from enum import Enum
from Review.schemas import Review
from Comment.schemas import Comment
from sqlalchemy import BLOB, JSON
from Core.Models.lists import Lists
from Core.Models.comment import Comments
from Core.Models.review import Reviews
from typing import Any


class Status(Enum):
    finished = "издано"
    ongoing = "выходит"
    stopped = "приостановлено"

class Rating(BaseModel):
    rating_10: int = 0
    rating_9: int = 0
    rating_8: int = 0
    rating_7: int = 0
    rating_6: int = 0
    rating_5: int = 0
    rating_4: int = 0
    rating_3: int = 0
    rating_2: int = 0
    rating_1: int = 0


    
class List_(BaseModel):
    id: int | None = None
    total_list: int | None = 0
    reading: int | None = 0
    planned: int | None = 0
    completed: int | None = 0
    favorite: int | None = 0
    on_hold: int | None = 0
    dropped : int | None = 0


class MangaAdd(BaseModel):
    name: str
    alternative_name: str
    picture: bytes 
    description: str | None
    tags: list[str] | None
    rating: float | None
    chapter_size: int | None
    volume_size: int | None
    status: Status | None
    time: str | None = None
    author: list[str] = []
    izdat: str | None = None

    model_config = {"extra": "forbid"}


class Manga(Rating):
    id: int | None = None
    name: str
    alternative_name: str
    time: str | None = None
    description: str | None
    tags: list[str] | None
    rating: float | None
    chapter_size: int | None
    volume_size: int | None
    status: Status | None
    time: str | None = None
    author: list[str] = []
    izdat: str | None = None

class MangaRel(Manga):
    
    comment: list["Comment"]

    review: list["Review"]
