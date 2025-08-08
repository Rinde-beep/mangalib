from pydantic import BaseModel

class Review(BaseModel):
    id: int
    manga_id: int
    user: int
    description: str
    rating: str
    likes: int
    dislikes: int
    comments: dict
