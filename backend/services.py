import openai
import os
import base64
import io
from PIL import Image
import google.generativeai as genai
import json
from backend.config import OPENAI_API_KEY, GEMINI_API_KEY, MEDIA_DIR

# Configure OpenAI API
# Configure Gemini AI
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel("models/gemini-2.0-flash-thinking-exp-1219")

def save_image_from_base64(b64_string: str, image_name: str) -> str:
    try:
        image_data = base64.b64decode(b64_string)
        image = Image.open(io.BytesIO(image_data))
        os.makedirs(MEDIA_DIR, exist_ok=True)
        image_path = os.path.join(MEDIA_DIR, image_name)
        image.save(image_path)
        return image_path
    except Exception as e:
        print(f"Error in saving image: {e}")
        return None

def generate_diy_ideas(image_base64: str) -> dict:
    prompt =  """ 
Based on the provided image of an item, generate three **unique, practical, and feasible** DIY project ideas categorized under three difficulty levels: Easy, Medium, and Hard. Ensure that all ideas take into account the physical properties, shape, and realistic transformation potential of the item.

#### **Key Guidelines:**
1. **Material Considerations:**  
   - Ensure all suggested projects are possible using only **one** uploaded item.  
   - Avoid unrealistic transformations (e.g., turning a bottle into a speaker system).  
   - Consider the durability, size, and weight of the object to propose achievable ideas.
   - Encourage upcycling concepts that extend the lifecycle of the item.

2. **Purpose of the Project:**  
   - The DIY ideas should serve diverse **practical purposes**, covering various aspects such as:  
     - **Home Organization:** Storage containers, organizers, holders, and compartmentalized systems.  
     - **Garden & Outdoor Use:** Watering tools, planters, seed starters, bird feeders.  
     - **Kids' Crafts:** Fun, safe, and educational crafts for children, including toys and learning aids.  
     - **Eco-Friendly Solutions:** Upcycling ideas that help reduce waste and contribute to sustainability.  
     - **Travel Accessories:** Compact and portable solutions for travelers (e.g., toiletry kits, organizers).  
     - **Gifting Ideas:** Thoughtful homemade gift items such as decorative pieces, custom organizers.  
     - **Emergency Hacks:** DIY survival tools such as mini storage, first aid kits, or travel organizers.  
   - Include multi-functional and space-saving concepts when possible to maximize utility.  
   - Suggest DIY ideas inspired by popular trends in **eco-living, minimalism, and home improvement.**  
   - Provide a mix of **decorative, functional, and entertainment-related** DIY concepts.

3. **Feasibility Constraints:**  
   - Projects should only require **basic tools and materials**, easily found at home (e.g., tape, glue, scissors).  
   - Avoid requiring multiple items of the same kind; transformations must rely on a single item.  
   - Ensure project completion is within realistic time frames for each difficulty level.  
   - All projects must be practical and should not require professional-level skills.

---

### **Project Structure**

For each difficulty level, generate the following structured output:

1. **DIY Product Description:**  
   - Clearly describe the project outcome in a practical and achievable manner.  
   - Explain its use-case and how it benefits daily life.  
   - Ensure the idea suits the size and shape of the provided item.

2. **Materials Required:**  
   - List the materials needed, including their exact quantities (always assume only **one uploaded item**).  
   - Provide simple, accessible supporting materials (e.g., glue, scissors).

3. **Step-by-Step Instructions:**  
   - Clear and actionable steps focusing on achievable methods.  
   - Provide time estimates and any waiting periods (e.g., drying time).

4. **Estimated Completion Time:**  
   - Realistic timeline based on the complexity of the task.

5. **Safety Tips:**  
   - Mention important safety measures specific to the project, such as handling sharp tools.

6. **Difficulty Level Explanation:**  
   - Justify why the project fits into the easy, medium, or hard category.

7. **Image Generation Prompt:**  
   - Describe how the finished project should look, including colors, size, and functional aspects.

---

### **Example JSON Response Format:**

```json
{
  "DIYProjects": [
    {
      "level": "Easy",
      "productDescription": "A self-watering plant system using an empty plastic bottle. The bottle is repurposed to slowly release water to plants over time.",
      "requiredMaterials": [
        { "material": "Plastic bottle", "quantity": "1" },
        { "material": "Cotton string", "quantity": "1 piece" },
        { "material": "Scissors", "quantity": "1" }
      ],
      "stepByStepInstructions": [
        { "stepNumber": 1, "description": "Cut the bottle in half and make a small hole in the cap.", "estimatedTime": "5 minutes" },
        { "stepNumber": 2, "description": "Thread the cotton string through the hole to create a wick.", "estimatedTime": "3 minutes" },
        { "stepNumber": 3, "description": "Fill the bottom half with water and place the top half inside.", "estimatedTime": "2 minutes" }
      ],
      "estimatedCompletionTime": "10 minutes",
      "safetyTips": ["Be careful when cutting plastic to avoid injury."],
      "difficultyLevel": "Easy",
      "difficultyExplanation": "Simple steps with minimal materials required.",
      "imageGenerationPrompt": "A plastic bottle turned into a self-watering system with a cotton wick and water inside."
    },
    {
      "level": "Medium",
      "productDescription": "A decorative storage container crafted from an empty tin can, ideal for organizing small household items.",
      "requiredMaterials": [
        { "material": "Tin can", "quantity": "1" },
        { "material": "Acrylic paint", "quantity": "as needed" },
        { "material": "Glue", "quantity": "1 small tube" }
      ],
      "stepByStepInstructions": [
        { "stepNumber": 1, "description": "Clean the tin can and remove any labels.", "estimatedTime": "5 minutes" },
        { "stepNumber": 2, "description": "Paint the exterior of the can and allow it to dry.", "estimatedTime": "30 minutes" },
        { "stepNumber": 3, "description": "Decorate with embellishments and glue securely.", "estimatedTime": "15 minutes" }
      ],
      "estimatedCompletionTime": "50 minutes",
      "safetyTips": ["Wear gloves to avoid sharp edges."],
      "difficultyLevel": "Medium",
      "difficultyExplanation": "Requires painting and decorating skills.",
      "imageGenerationPrompt": "A repurposed tin can, painted and decorated with floral patterns, used as a small organizer."
    }
  ]
}

    ```
    """

    try:
        input_data = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt},
                        {
                            "inline_data": {
                                "mime_type": "image/jpeg",
                                "data": image_base64
                            }
                        }
                    ]
                }
            ]
        }

        print("Sending request to Gemini AI...")
        response = gemini_model.generate_content(input_data["contents"])

        if response and hasattr(response, 'text') and response.text:
            response_text = response.text.strip().replace("```json", "").replace("```", "").strip()

            try:
                parsed_response = json.loads(response_text)
                if "DIYProjects" not in parsed_response:
                    raise ValueError("Missing 'DIYProjects' key in response.")

                print("Parsed JSON response successfully.")
                return parsed_response
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON response: {e}")
                print("Raw response causing issue:", response_text)
                return None
        else:
            raise Exception("Invalid response received from Gemini AI")
    except Exception as e:
        print(f"Error generating DIY ideas: {e}")
        return None


client = openai.Client(api_key=OPENAI_API_KEY)

def save_image_from_base64(b64_string: str, image_name: str) -> str:
    """Converts base64 string to an image and saves it locally in the MEDIA_DIR."""
    try:
        image_data = base64.b64decode(b64_string)
        image = Image.open(io.BytesIO(image_data))

        # Ensure MEDIA_DIR exists
        os.makedirs(MEDIA_DIR, exist_ok=True)

        # Save the image
        image_path = os.path.join(MEDIA_DIR, image_name)
        image.save(image_path)

        print(f"Image saved successfully at: {image_path}")
        return image_path
    except Exception as e:
        print(f"Error in saving image: {e}")
        return None

def generate_diy_image(prompt: str, image_name: str) -> str:
    """Generates an AI-generated DIY project image using OpenAI's updated API format and saves it in the media directory."""
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            response_format="b64_json",
            n=1
        )

        if response and len(response.data) > 0:
            image_b64 = response.data[0].b64_json
            image_path = save_image_from_base64(image_b64, image_name)
            return image_path
        else:
            raise Exception("No image data received from OpenAI API.")
    except Exception as e:
        print(f"Error generating image: {e}")
        return None
