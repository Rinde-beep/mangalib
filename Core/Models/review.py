import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from Core.Models.Base import Base
from sqlalchemy import Column, String, JSON, Float, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
import Core.Models.manga as m
import Core.Models.comment as c
import Core.Models.user as u
from typing import List
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from Core.Models.comment import Comments
    from Core.Models.lists import Lists
    from Core.Models.review import Reviews
    from Core.Models.user import Users
    from Core.Models.manga import Mangas

class Reviews(Base):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    manga_id: Mapped[int] = mapped_column(ForeignKey("mangas.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    rating: Mapped[float] = mapped_column(nullable=False)
    likes: Mapped[int] = mapped_column(nullable=False)
    dislikes: Mapped[int] = mapped_column(nullable=False)

    # manga: Mapped["m.Mangas"] = relationship(back_populates="review")

    # user: Mapped["u.Users"] = relationship(back_populates="review")

    # comment: Mapped[List["c.Comments"]] = relationship(back_populates="review")


