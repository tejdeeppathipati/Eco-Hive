import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# OpenAI and Gemini API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Directory to save images
MEDIA_DIR = "media"
