from fastapi import APIRouter, Query
from typing import Annotated
from Catalog.crud import CatalogDAO
from fastapi_cache.decorator import cache
from Catalog.schemas import Order

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
