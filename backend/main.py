from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.routes import router  # Ensure your routes are imported
from backend.config import MEDIA_DIR
import os

app = FastAPI()

# Allow CORS for your frontend (React running on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Ensure the media directory exists
if not os.path.exists(MEDIA_DIR):
    os.makedirs(MEDIA_DIR)

# Mount the media directory to serve images
app.mount("/media", StaticFiles(directory=MEDIA_DIR), name="media")

# Include your API routes
app.include_router(router)
