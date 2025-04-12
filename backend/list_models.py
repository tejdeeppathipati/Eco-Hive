import google.generativeai as genai

# Set your Gemini API key directly
GEMINI_API_KEY = "AIzaSyCzVmThACtU3jVBMgS0KVA6cXUjJPQHpl8"

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set. Please check your API key.")

# Configure the Generative AI client
genai.configure(api_key=GEMINI_API_KEY)

try:
    # List available models
    models = genai.list_models()

    # Print available model names
    print("Available Gemini Models:")
    for model in models:
        print(model.name)
except Exception as e:
    print(f"Error fetching models: {e}")
