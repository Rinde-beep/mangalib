from pydantic import BaseModel, Field

class Review(BaseModel):
    id: int | None = None
    manga_id: int
    user: int
    description: str
    likes: int = 0
    dislikes: int = 0

class ReviewAdd(BaseModel):
    description: str = Field(min_length=100)
    rating: int = Field(ge=0, le=10)
    likes: int = 0
    dislikes: int = 0

