import streamlit as st
import requests
import json
import base64
from PIL import Image

st.set_page_config(page_title="DIY Project Generator", page_icon="🛠️")

st.title("DIY Project Generator")

uploaded_img = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_img is not None:
    st.image(uploaded_img, caption="Uploaded Image", use_column_width=True)

    if st.button("Generate DIY Project Ideas"):
        st.write("Generating DIY Project... Please wait.")

        img_bytes = uploaded_img.getvalue()
        img_b64 = base64.b64encode(img_bytes).decode("utf-8")

        try:
            response = requests.post("http://127.0.0.1:8000/scan-product/", files={"file": uploaded_img})
            if response.status_code == 200:
                result = response.json()

                st.success("DIY Project Generated Successfully!")

                for project in result["diy_ideas"]["DIYProjects"]:
                    st.subheader(f"{project['projectOverview']['title']} ({project['skillLevel']})")
                    st.write(project["projectOverview"]["description"])

                    st.markdown("**Materials Needed:**")
                    for material in project["materialsNeeded"]:
                        st.write(f"- {material}")

                    st.markdown("**Step-by-Step Instructions:**")
                    for step in project["stepByStepInstructions"]:
                        st.write(step)

                    st.markdown(f"**Estimated Time:** {project['estimatedTime']}")
                    st.markdown(f"**Difficulty Level:** {project['difficultyLevelExplanation']}")

                    st.markdown("**Generated Image:**")
                    image_key = project['skillLevel'].lower()
                    if result["images"].get(image_key):
                        st.image(result["images"][image_key], caption=f"{project['projectOverview']['title']}")

            else:
                st.error("Error generating DIY ideas. Please try again.")
        except Exception as e:
            st.error(f"Error: {e}")
