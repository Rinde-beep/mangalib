import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from Core.Models.Base import Base
from sqlalchemy import Column, Integer, String, ForeignKey, ARRAY
from sqlalchemy.orm import mapped_column, Mapped, relationship
from pydantic import EmailStr
import Core.Models.manga as m
import Core.Models.review as r
from typing import List
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from Core.Models.comment import Comments
    from Core.Models.lists import Lists
    from Core.Models.review import Reviews
    from Core.Models.user import Users
    from Core.Models.manga import Mangas


class Users(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    login: Mapped[str] = mapped_column(default="MangaUser")
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(nullable=False)
    lvl: Mapped[int] = mapped_column(nullable=False, default=0)
    bookmarks: Mapped[list[int]] = mapped_column(ARRAY(Integer), nullable=False, default="")