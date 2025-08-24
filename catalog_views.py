from fastapi import APIRouter, Query
from typing import Annotated
from Catalog.crud import CatalogDAO
from fastapi_cache.decorator import cache
from Catalog.schemas import Order
from fastapi.responses import StreamingResponse, Response
from PIL import Image
import io

router = APIRouter(prefix="/api/catalog", tags=["Catalog"])

@router.get("/")
# @cache(expire=30)
async def catalog(page: int = 0, 
            genres_include:
            Annotated[list[str] | str, Query()] = None, 
            genres_exclude: Annotated[list[str] | str, Query()] = None,
            order: Annotated[Order, Query()] | None = None,
            desc: bool | None = False
            ):
    res = await CatalogDAO.see_catalog(page, genres_include, genres_exclude, order, desc)
    return res



@router.get("/picture/{id}")
# @cache(expire=30)
async def catalog_picture(id: int):
    res = await CatalogDAO.find_by_id(id)
    return StreamingResponse(content=res.picture, media_type="image/jpeg")
