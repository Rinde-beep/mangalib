from Core.Models.Base import Base
from sqlalchemy import Column, String, LargeBinary, Float, ARRAY
from sqlalchemy.orm import mapped_column, Mapped, relationship
from typing import List
import Core.Models.ratings as r
import Core.Models.comment as c
import Core.Models.review as r
import Core.Models.user as u
import Core.Models.lists as l

class Mangas(Base):

    __tablename__ = "mangas"

    id: Mapped[int] = mapped_column(primary_key=True)
    preview_picture_id: Mapped[str] = mapped_column(default="")
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column()
    tags: Mapped[list[str]] = mapped_column(ARRAY(String),nullable=False)
    rating: Mapped[float] = mapped_column(nullable=False)
    chapter_size: Mapped[int] = mapped_column(nullable=False)
    volume_size: Mapped[int] = mapped_column(nullable=False)
    status: Mapped[str] = mapped_column(nullable=False)

    # list: Mapped[List["l.Lists"]] = relationship(back_populates="manga")
    
    # rating: Mapped[List["r.Ratings"]] = relationship(back_populates="manga")

    # comment: Mapped[List["c.Comments"]] = relationship(back_populates="manga")

    # review: Mapped[List["r.Reviews"]] = relationship(back_populates="manga")

    # user: Mapped[List["u.Users"]] = relationship(back_populates="manga")
    



