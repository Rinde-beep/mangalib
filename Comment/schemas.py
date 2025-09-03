from pydantic import BaseModel
from User.schemas import UserForProfile

class CommentAdd(BaseModel):
    description: str
    likes: int = 0
    dislikes: int = 0

class Comment(CommentAdd):
    id: int | None = None
    manga_id: int
    user: "UserForProfile"
