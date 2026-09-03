from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import contact

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Configure properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
