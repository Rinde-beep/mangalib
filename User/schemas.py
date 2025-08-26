from pydantic import BaseModel
from pydantic import EmailStr, Field



class UserReg(BaseModel):
    email: EmailStr
    password: str = Field(min_length=5)

class UserForProfile(BaseModel):
    login: str = "MangaUser"
    email: EmailStr
    lvl: int = 0
    bookmarks: list[int] | None = []

class User(UserForProfile):
    password: str
    id: int | None = None

class UserLogin(BaseModel):
    password: str
    login: str
