from Core.Models.Base import Base
from sqlalchemy import Column, Integer, String, LargeBinary, Float


class Mangas(Base):
    __tablename__ = "mangas"

    id = Column(Integer, primary_key=True)
    preview_picture_id: int = Column(String, default=None)
    name = Column(String, nullable=False)
    description = Column(String)
    tags = Column(String, nullable=False)
    rating = Column(Float, nullable=False)
    chapter_size = Column(Integer, nullable=False)
    volume_size = Column(Integer, nullable=False)
    status = Column(String, nullable=False)

