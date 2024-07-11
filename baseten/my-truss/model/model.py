import base64
from io import BytesIO
import torch
from diffusers import AutoPipelineForImage2Image
from PIL import Image
import requests
from fastapi.responses import StreamingResponse
from rembg import remove

class PNGResponse(StreamingResponse):
    media_type = "image/png"

class Model:
    def __init__(self, **kwargs):
        self._model = None

    def load(self):
        self._model = AutoPipelineForImage2Image.from_pretrained(
            "SimianLuo/LCM_Dreamshaper_v7",
            torch_dtype=torch.float16,
            use_safetensors=True,
        ).to("cuda")
        self._model.safety_checker = None
        self._model.requires_safety_checker = False

    def download_image_from_url(self, url):
        response = requests.get(url)
        image = Image.open(BytesIO(response.content)).convert("RGB")
        return image

    def convert_to_b64(self, image: Image) -> str:
        buffered = BytesIO()
        image.save(buffered, format="PNG")  # Save as PNG to retain transparency
        img_b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return img_b64

    def predict(self, model_input):
        prompt = model_input.pop("prompt", "a cat")
        num_inference_steps = model_input.get("num_inference_steps", 4)
        width = model_input.pop("width", 512)
        height = model_input.pop("height", 512)
        strength = model_input.pop("strength", 0.5)
        images_data = model_input.pop("images_data", "") 
        seed = model_input.pop("seed", 2159232)
        final_images = []
        resolution = 512
        if images_data:
            if isinstance(images_data, str):
                print("received image data")
                if images_data.startswith("http://") or images_data.startswith("https://"):
                    image = self.download_image_from_url(images_data)
                else:
                    image = Image.open(BytesIO(base64.b64decode(images_data))).convert("RGB")
                image = image.resize((resolution, resolution))
                final_images.append(image)

            elif isinstance(images_data, list) and all(isinstance(item, str) for item in images_data):
                print("received image data array")
                temp_images = []
                for temp_image_data in images_data:
                    if temp_image_data.startswith("http://") or temp_image_data.startswith("https://"):
                        temp_image = self.download_image_from_url(temp_image_data)
                    else:
                        temp_image = Image.open(BytesIO(base64.b64decode(temp_image_data))).convert("RGB")
                    temp_image = temp_image.resize((resolution, resolution))
                    temp_images.append(temp_image)

                final_images = temp_images
        else:
            print("no image")
            return {"status": "no images return"}

        images = self._model(
            prompt=prompt,
            image=final_images,
            strength=strength,
            num_inference_steps=num_inference_steps,
            guidance_scale=8.0,
            seed=seed,
            lcm_origin_steps=50,
            width=width,
            height=height,
            output_type="pil",
        )

        image = images.images[0]
        image_no_bg = remove(image)

        img_b64 = self.convert_to_b64(image_no_bg)

        return {"image": img_b64}
