from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests

app = Flask(__name__)
# Enable CORS with specific settings
CORS(app, resources={r"/proxy": {"origins": "http://localhost:3000"}})

@app.route('/proxy', methods=['POST'])
def proxy():
    data = request.json
    url = "https://app.baseten.co/model_versions/q48rmd3/predict"
    headers = {
        "Authorization": "Api-Key 13235osK.AVglR2jVhzMHR1txMuFJCD49TEmV6FXY",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response_data = response.json()

        if response.ok:
            return jsonify(response_data)
        else:
            return jsonify({"error": response_data}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
