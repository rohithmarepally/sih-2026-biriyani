import re

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.tax_registration import TaxRegistration

router = APIRouter(prefix="/compliance", tags=["compliance"])

GSTIN_PATTERN = re.compile(r"\b[0-9A-Z]{15}\b")
PAN_PATTERN = re.compile(r"\b[A-Z]{5}[0-9]{4}[A-Z]\b")
MAX_UPLOAD_BYTES = 10 * 1024 * 1024


class ComplianceResponse(BaseModel):
    filename: str
    extracted_gstin: str | None
    extracted_pan: str | None
    gstin_match: bool
    pan_match: bool
    matched_registration_id: int | None
    compliance_score: int


def _extract_identifiers(document: bytes) -> tuple[str | None, str | None]:
    """Simulate OCR/PDF extraction by searching the uploaded document text."""
    text = document.decode("utf-8", errors="ignore").upper()
    gstin = GSTIN_PATTERN.search(text)
    pan = PAN_PATTERN.search(text)
    return (
        gstin.group(0) if gstin else None,
        pan.group(0) if pan else None,
    )


@router.post(
    "/check",
    response_model=ComplianceResponse,
    status_code=status.HTTP_200_OK,
)
async def check_compliance(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> ComplianceResponse:
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Only PDF uploads are supported.",
        )

    document = await file.read(MAX_UPLOAD_BYTES + 1)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded PDF is empty.",
        )
    if len(document) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="The uploaded PDF exceeds the 10 MB limit.",
        )

    extracted_gstin, extracted_pan = _extract_identifiers(document)
    gstin_record = (
        db.query(TaxRegistration)
        .filter(TaxRegistration.gstin == extracted_gstin)
        .first()
        if extracted_gstin
        else None
    )
    pan_record = (
        db.query(TaxRegistration)
        .filter(TaxRegistration.pan == extracted_pan)
        .first()
        if extracted_pan
        else None
    )
    gstin_match = gstin_record is not None
    pan_match = pan_record is not None
    registration = (
        gstin_record
        if gstin_record is not None and gstin_record.id == pan_record.id
        else None
    )
    compliance_score = (50 if gstin_match else 0) + (50 if pan_match else 0)

    return ComplianceResponse(
        filename=file.filename or "uploaded.pdf",
        extracted_gstin=extracted_gstin,
        extracted_pan=extracted_pan,
        gstin_match=gstin_match,
        pan_match=pan_match,
        matched_registration_id=registration.id if registration else None,
        compliance_score=compliance_score,
    )
