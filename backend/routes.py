from fastapi import APIRouter, File, UploadFile, HTTPException
from backend.services import generate_diy_ideas, generate_diy_image
import base64
import logging

router = APIRouter()

@router.post("/scan-product/")
async def scan_product(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image_b64 = base64.b64encode(image_bytes).decode("utf-8")
        diy_ideas = generate_diy_ideas(image_b64)
        

        if not diy_ideas or "DIYProjects" not in diy_ideas:
            raise HTTPException(status_code=500, detail="DIY idea generation failed")

        easy_prompt = diy_ideas["DIYProjects"][0]["imageGenerationPrompt"]
        medium_prompt = diy_ideas["DIYProjects"][1]["imageGenerationPrompt"]
        hard_prompt = diy_ideas["DIYProjects"][2]["imageGenerationPrompt"]

        easy_image = generate_diy_image(easy_prompt, "easy_project.png")
        medium_image = generate_diy_image(medium_prompt, "medium_project.png")
        hard_image = generate_diy_image(hard_prompt, "hard_project.png")

        response_data = {
            "diy_ideas": diy_ideas,
            "images": {"easy": easy_image, "medium": medium_image, "hard": hard_image}
        }

        logging.info(f"Response Data: {response_data}")
        return response_data

    except Exception as e:
        logging.error(f"Error processing DIY ideas: {e}")
        raise HTTPException(status_code=500, detail=str(e))
