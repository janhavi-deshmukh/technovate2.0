from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
import json

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Configure Gemini API
genai.configure(api_key="AIzaSyA3iT4fsZCG_kO0KjynxL4POSZPfXGInwQ")

# Create the model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

chat_session = model.start_chat(
    history=[
        {
            "role": "user",
            "parts": [
            '''You are a sustainability analysis expert specializing in lifecycle assessment and carbon footprint analysis. Your task is to evaluate a product's environmental impact based on the provided details and recommend similar, more sustainable products.

### Product Information:
- *Product Name: {name}
- **Category: {category}
- **Material Composition: {material}
- **Weight: {weight}
- **Manufacturing Location: {location}
- **Energy Consumption (if applicable): N/A
- **Packaging Details: {packaging}
- **Recyclability: {recyclable}
- **Expected Lifespan: {lifespan}
- **Price: {price}

### Task:
1. Estimate the product's carbon footprint using general sustainability principles. Consider factors such as material type, weight, manufacturing location, and energy consumption.
2. Provide a CO₂ emission estimate in kilograms (kg) for the product.
3. Suggest three similar products that are more sustainable, explaining why they are better alternatives. Include details like material type, estimated CO₂ savings, and potential price range.

*Please keep your response concise and focused, aiming for no more than three sentences per recommendation and summary points for the CO₂ estimate.*

### Response Format: 
{
  "CO2EmissionEstimate": {
    "estimatedCO2Emission": "{value} kg"
  },
  "sustainableAlternatives": [
    {
      "productName": "{alternative_1_name}",
      "reasonForRecommendation": "{alternative_1_reason}",
      "estimatedCO2Savings": "{value} kg",
      "approximatePrice": "{value}"
    },
    {
      "productName": "{alternative_2_name}",
      "reasonForRecommendation": "{alternative_2_reason}",
      "estimatedCO2Savings": "{value} kg",
      "approximatePrice": "{value}"
    },
    {
      "productName": "{alternative_3_name}",
      "reasonForRecommendation": "{alternative_3_reason}",
      "estimatedCO2Savings": "{value} kg",
      "approximatePrice": "{value}"
    }
  ]
}



Make sure your analysis and recommendations are actionable, based on the given data, and concise as per the instructions.

'''
            ],
        }
    ]
)

# get method
@app.route('/')
def index():
    return "Hello, World!"

@app.route('/analyze', methods=['POST'])
def analyze_product():
    # print(request.json)
    try:
        product_data = request.json
        
        # Format the prompt with actual product data
        prompt = f"""
       You are a sustainability analysis expert specializing in lifecycle assessment and carbon footprint analysis. Your task is to evaluate a product's environmental impact based on the provided details and recommend similar, more sustainable products.

### Product Information:
- Name: {product_data.get('name', 'Unknown')}
- Description: {product_data.get('desc', 'Unknown')}
- Additional_info: {product_data.get('info', 'Unknown')}
- Price: {product_data.get('price', 'Unknown')}

### Task:
1. Provide an estimated CO₂ emission in kilograms (kg) for the product based on general sustainability principles.
2. List the aspects considered when calculating the CO₂ emission (such as material type, weight, manufacturing location, etc.).

Give response in JSON format. 


        """
        
        # Get response from Gemini
        response = chat_session.send_message(prompt)
        print(response)
        # Parse the response to extract structured data
        # This is a simplified parsing - you might need to adjust based on actual response format
        response_text = response.text
        
        return jsonify({
            'success': True,
            'data': response_text
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(port=3000)