from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import compliance, health, items
from app.core.config import get_settings
from app.db.session import Base, SessionLocal, engine
from app.models import Item, TaxRegistration  # noqa: F401 - registers models before create_all


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        if db.query(TaxRegistration).count() == 0:
            db.add(
                TaxRegistration(
                    gstin="29ABCDE1234F1Z5",
                    pan="ABCDE1234F",
                )
            )
            db.commit()
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
app.include_router(compliance.router, prefix="/api")
