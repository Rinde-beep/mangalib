import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from Core.Models.Base import Base
from sqlalchemy import Column, String, LargeBinary, Float, func, text
from sqlalchemy.orm import mapped_column, Mapped, relationship
from typing import List, TYPE_CHECKING
from sqlalchemy.dialects.postgresql import ARRAY
from enum import Enum
from datetime import datetime

if TYPE_CHECKING:
    from Core.Models.comment import Comments
    from Core.Models.lists import Lists
    from Core.Models.review import Reviews
    from Core.Models.user import Users
    from Core.Models.manga import Mangas

class Mangas(Base):

    __tablename__ = "mangas"
    __table_args__ = {'extend_existing': True}

    id: Mapped[int] = mapped_column(primary_key=True)
    picture: Mapped[bytes] = mapped_column(LargeBinary)
    name: Mapped[str] = mapped_column()
    alternative_name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column(nullable=True)
    tags: Mapped[list[str]] = mapped_column(ARRAY(String))
    rating: Mapped[float] = mapped_column()
    chapter_size: Mapped[int] = mapped_column()
    volume_size: Mapped[int] = mapped_column()
    status: Mapped[str] = mapped_column()
    time: Mapped[str] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
    author: Mapped[list[str]] = mapped_column(ARRAY(String))
    izdat: Mapped[str] = mapped_column()

    rating_10: Mapped[int] = mapped_column(default=0)
    rating_9: Mapped[int] = mapped_column(default=0)
    rating_8: Mapped[int] = mapped_column(default=0)
    rating_7: Mapped[int] = mapped_column(default=0)
    rating_6: Mapped[int] = mapped_column(default=0)
    rating_5: Mapped[int] = mapped_column(default=0)
    rating_4: Mapped[int] = mapped_column(default=0)
    rating_3: Mapped[int] = mapped_column(default=0)
    rating_2: Mapped[int] = mapped_column(default=0)
    rating_1: Mapped[int] = mapped_column(default=0)



    # list: Mapped["Lists"] = relationship(back_populates="manga")
    
    comment: Mapped[List["Comments"]] = relationship(back_populates="manga", lazy="selectin")

    review: Mapped[List["Reviews"]] = relationship(back_populates="manga", lazy="selectin")

    



