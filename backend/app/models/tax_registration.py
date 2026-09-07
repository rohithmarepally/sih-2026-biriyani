from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.session import Base


class TaxRegistration(Base):
    __tablename__ = "tax_registrations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    gstin: Mapped[str] = mapped_column(String(15), unique=True, index=True)
    pan: Mapped[str] = mapped_column(String(10), index=True)
