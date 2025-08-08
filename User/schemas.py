from pydantic import BaseModel
from pydantic import EmailStr

class User(BaseModel):
    id: int
    login: str
    password: str
    email: EmailStr
    lvl: int = 0
    bookmarks: None = None

