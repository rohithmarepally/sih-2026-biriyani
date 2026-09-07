from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import health, items
from app.core.config import get_settings
from app.db.session import Base, engine
from app.models import Item  # noqa: F401 - registers models before create_all


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


settings = get_settings()
app = FastAPI(
    title="Biriyani API",
    version="0.1.0",
    description="FastAPI backend for the SIH 2026 Biriyani application.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(items.router, prefix="/api")
