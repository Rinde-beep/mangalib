import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from Core.Models.Base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from Core.Models.comment import Comments
    from Core.Models.lists import Lists
    from Core.Models.review import Reviews
    from Core.Models.user import Users
    from Core.Models.manga import Mangas

class Lists(Base):
    __tablename__ = "lists"

    id: Mapped[int] = mapped_column(primary_key=True)
    manga_id: Mapped[int] = mapped_column(ForeignKey("mangas.id"))
    total_list: Mapped[int] = mapped_column(default=0)
    reading: Mapped[int] = mapped_column(default=0)
    planned: Mapped[int] = mapped_column(default=0)
    completed: Mapped[int] = mapped_column(default=0)
    favorite: Mapped[int] = mapped_column(default=0)
    on_hold: Mapped[int] = mapped_column(default=0)
    dropped: Mapped[int] = mapped_column(default=0)

    # manga: Mapped["m.Mangas"] = relationship(back_populates="list")
