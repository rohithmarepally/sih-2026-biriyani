# SIH 2026 Biriyani

Full-stack starter application with a Next.js frontend and a FastAPI backend.

## Stack

- **Frontend:** Next.js App Router, TypeScript, Tailwind CSS
- **Backend:** Python FastAPI, SQLAlchemy 2, PostgreSQL
- **Local services:** Docker Compose for PostgreSQL

## Project structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/routes/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
├── docker-compose.yml
└── package.json
```

## Getting started

### 1. Start PostgreSQL

```bash
docker compose up -d db
```

### 2. Run the FastAPI backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

The API is available at http://localhost:8000 and its OpenAPI docs at http://localhost:8000/docs.

### Compliance check

Upload a mock PDF containing a GSTIN and PAN to compare the extracted values with
the seeded `tax_registrations` PostgreSQL table:

```bash
curl -X POST http://localhost:8000/api/compliance/check \
  -F "file=@mock-registration.pdf;type=application/pdf"
```

The seeded matching record is `GSTIN=29ABCDE1234F1Z5` and `PAN=ABCDE1234F`.
The response includes the extracted identifiers, individual match flags, and a
`compliance_score` from 0 to 100.

### 3. Run the Next.js frontend

```bash
npm install
npm run dev
```

The frontend is available at http://localhost:3000. Set `NEXT_PUBLIC_API_URL` in `frontend/.env.local` if the API is not running on its default URL.
