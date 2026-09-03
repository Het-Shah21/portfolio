from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.contact import router as contact_router

app = FastAPI(title="Portfolio API")

# Configure CORS to allow requests from the Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (POST, GET, etc)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(contact_router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
