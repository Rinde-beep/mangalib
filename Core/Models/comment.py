from Core.Models.Base import Base
from sqlalchemy import Column, String, JSON, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
import Core.Models.manga as m
import Core.Models.review as r
from typing import List
class Comments(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    manga_id: Mapped[int] = mapped_column(ForeignKey("mangas.id"))
    review_id: Mapped[int] = mapped_column(ForeignKey("reviews.id"))
    user: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    likes: Mapped[int] = mapped_column(nullable=False)
    dislikes: Mapped[int] = mapped_column(nullable=False)

    # manga: Mapped["m.Mangas"] = relationship(back_populates="comment")
    # review: Mapped["r.Reviews"] = relationship(back_populates="comment")
