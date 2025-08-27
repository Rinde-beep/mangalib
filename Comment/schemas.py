from pydantic import BaseModel


class Comment(BaseModel):
    id: int | None = None
    manga_id: int
    user: int
    description: str
    likes: int = 0
    dislikes: int = 0

class CommentAdd(BaseModel):
    description: str
    likes: int = 0
    dislikes: int = 0
