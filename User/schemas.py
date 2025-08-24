from pydantic import BaseModel
from pydantic import EmailStr, Field

class User(BaseModel):
    id: int | None = None
    password: str
    email: EmailStr
    lvl: int = 0
    bookmarks: str | None = ""

class UserReg(BaseModel):
    email: EmailStr
    password: str = Field(min_length=5)

