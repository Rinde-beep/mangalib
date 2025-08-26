from fastapi import APIRouter, Query
from typing import Annotated
from Catalog.crud import CatalogDAO
from fastapi_cache.decorator import cache
from Catalog.schemas import Order
from fastapi.responses import StreamingResponse, Response
from PIL import Image
import io
from Manga.schemas import Manga
from Catalog.schemas import MangaCatalog

router = APIRouter(prefix="/api/catalog", tags=["Catalog"])

@router.get("/")
# @cache(expire=30)
async def catalog(page: int = 0, 
            genres_include:
            Annotated[list[str] | str, Query()] = None, 
            genres_exclude: Annotated[list[str] | str, Query()] = None,
            order: Annotated[Order, Query()] | None = None,
            desc: bool | None = False
            ) -> list[MangaCatalog]:
    res = await CatalogDAO.see_catalog(page, genres_include, genres_exclude, order, desc)
    return res



@router.get("/picture/{id}")
# @cache(expire=30)
async def catalog_picture(id: int) -> StreamingResponse:
    res = await CatalogDAO.find_by_id(id)
    image_stream = io.BytesIO(res.picture)
    return StreamingResponse(image_stream, media_type="image/png")
