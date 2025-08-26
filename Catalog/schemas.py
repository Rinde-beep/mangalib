from enum import Enum
from pydantic import BaseModel


class Order(Enum):
    rating = "rating"
    chapter = "chapter"
    volume = "volume"
    id = "id"

class MangaCatalog(BaseModel):
    id: int
    name: str
    alternative_name: str
    rating: float
