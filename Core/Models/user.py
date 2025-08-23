from Core.Models.Base import Base
from sqlalchemy import Column, Integer, String, ForeignKey, ARRAY
from sqlalchemy.orm import mapped_column, Mapped, relationship
from pydantic import EmailStr
import Core.Models.manga as m
import Core.Models.review as r
from typing import List


class Users(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    login: Mapped[str] = mapped_column(default="MangaUser")
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(nullable=False)
    lvl: Mapped[int] = mapped_column(nullable=False, default=0)
    bookmarks: Mapped[list[int]] = mapped_column(ARRAY(Integer), ForeignKey("mangas.id"), nullable=False, default="")

    # manga: Mapped["m.Mangas"] = relationship(back_populates="user")

    # review: Mapped[List["r.Reviews"]] = relationship(back_populates="user")

