import requests
import json
import base64
from io import BytesIO
from PIL import Image
import datetime
now = datetime.datetime.now()

#test for canny

rioServer_id = "q48rmd3"

server_id = "qrjljv3"
url = rf"https://app.baseten.co/model_versions/{rioServer_id}/predict"
headers = {
    "Authorization": "Api-Key 13235osK.AVglR2jVhzMHR1txMuFJCD49TEmV6FXY",
    "Content-Type": "application/json"
}
img_name = "testimgs/cat.jpeg"
#img_name = "testimgs/girl_with_a_pearl_earring.jpg"
with open(img_name, "rb") as f:
    bytes = f.read()
    encoded = base64.b64encode(bytes).decode('utf-8')


# data = {
#     "command": "txt2img",
#     'prompt': "a super dog with 1 head",
#     "num_images_per_prompt": 2,
#     "width": 1024,
#     "height": 1024,
# }

data = {
    "prompt": "a cat",
    "images_data": encoded,
    "guidance_scale": 8,
    "lcm_steps": 50,
    "seed": 2159232,
    "num_inference_steps": 4,
    "strength": 0.5,
    "width": 512,
    "height": 512,
}

date_string = now.strftime("%Y-%m-%d_%H-%M-%S")
response = requests.post(url, headers=headers, data=json.dumps(data))

print(response.json())

img_str = response.json()["model_output"]["image"]
img_data = base64.b64decode(img_str)
img = Image.open(BytesIO(img_data))
filename = f"images/image_{date_string}.png"
with open(filename, "wb") as f:
    img.save(f, format="PNG")

# for i, img_str in enumerate(response.json()["model_output"]["data"]):
#     # decode the base64-encoded string to bytes
#     img_data = base64.b64decode(img_str)
#     # convert the bytes to a PIL image object
#     img = Image.open(BytesIO(img_data))
#     # save the image to disk with a unique filename
#     filename = f"images/image_{i}_{date_string}.png"
#     with open(filename, "wb") as f:
#         img.save(f, format="PNG")
