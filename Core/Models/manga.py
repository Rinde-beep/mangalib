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
    total_list = Column(Integer)
    reading = Column(Integer)
    planned = Column(Integer)
    completed = Column(Integer)
    favorite = Column(Integer)
    on_hold = Column(Integer)
    dropped = Column(Integer)
    total_rating = Column(Integer)
    rating_10 = Column(Integer)
    rating_9 = Column(Integer)
    rating_8 = Column(Integer)
    rating_7 = Column(Integer)
    rating_6 = Column(Integer)
    rating_5 = Column(Integer)
    rating_4 = Column(Integer)
    rating_3 = Column(Integer)
    rating_2 = Column(Integer)
    rating_1 = Column(Integer)

