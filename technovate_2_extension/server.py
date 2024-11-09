import os
import google.generativeai as genai

genai.configure(api_key=os.environ[""])

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
        "You are a sustainability analysis expert specializing in lifecycle assessment and carbon footprint analysis. Your task is to evaluate a product's environmental impact based on the provided details and recommend similar, more sustainable products.\n\n### Product Information:\n- *Product Name: Stainless Steel Water Bottle\n- **Category: Home & Kitchen\n- **Material Composition: Recyclable cardboard box\n- **Weight: 0.5 kg\n- **Manufacturing Location: China\n- **Energy Consumption (if applicable): N/A\n- **Packaging Details: Recyclable cardboard box\n- **Recyclability: Yes\n- **Expected Lifespan: 5 years\n- **Price: $20\n\n### Task:\n1. Estimate the product's carbon footprint using general sustainability principles. Consider factors such as material type, weight, manufacturing location, and energy consumption.\n2. Provide a CO₂ emission estimate in kilograms (kg) for the product.\n3. Suggest three similar products that are more sustainable, explaining why they are better alternatives. Include details like material type, estimated CO₂ savings, and potential price range.\n\n### Response Format:\n#### CO₂ Emission Estimate:\n- Estimated CO₂ Emission: {value} kg\n\n#### Sustainable Alternatives:\n1. **Product Name: {alternative_1_name}\n   - **Reason for Recommendation: {alternative_1_reason}\n   - **Estimated CO₂ Savings: {value} kg\n   - **Approximate Price: {value}\n2. **Product Name: {alternative_2_name}\n   - **Reason for Recommendation: {alternative_2_reason}\n   - **Estimated CO₂ Savings: {value} kg\n   - **Approximate Price: {value}\n3. **Product Name: {alternative_3_name}\n   - **Reason for Recommendation: {alternative_3_reason}\n   - **Estimated CO₂ Savings: {value} kg\n   - **Approximate Price*: {value}\n\nMake sure your analysis and recommendations are actionable and based on the given data.\n",
      ],
    },
    {
      "role": "model",
      "parts": [
        "## CO₂ Emission Estimate:\n\n- *Estimated CO₂ Emission:* 10-15 kg\n\n*Explanation:* \nThis estimate is based on general principles and assumptions, as specific data on the manufacturing process is not available. \n\n* *Material Production:* Stainless steel production has a significant carbon footprint due to the energy-intensive process. The weight of the bottle contributes to this emission.\n* *Manufacturing and Transportation:* Manufacturing in China involves transportation of materials and the finished product.  While the exact distance is unknown, it's likely a significant contributor to the carbon footprint.\n* *Packaging:* The recyclable cardboard box has a lower carbon footprint compared to plastic or non-recyclable packaging.\n* *End-of-Life:* While the bottle is recyclable, the actual recycling rate is variable and can impact the overall footprint.\n\n## Sustainable Alternatives:\n\n1. *Product Name:* *Aluminum Water Bottle\n   - **Reason for Recommendation:* Aluminum has a lower carbon footprint than stainless steel production, especially when recycled aluminum is used. It's also highly recyclable and durable.\n   - *Estimated CO₂ Savings:* 2-5 kg\n   - *Approximate Price:* $15-25\n2. *Product Name:* *Glass Water Bottle\n   - **Reason for Recommendation:* Glass production requires less energy than stainless steel and is highly recyclable. While more fragile, it offers a sustainable and chemical-free option.\n   - *Estimated CO₂ Savings:* 5-8 kg\n   - *Approximate Price:* $10-20\n3. *Product Name:* *Reusable Water Bottle with Built-in Filter\n   - **Reason for Recommendation:* Reduces the need for disposable plastic water bottles and promotes water filtration at home, leading to a lower overall carbon footprint. \n   - *Estimated CO₂ Savings:* Varies depending on the specific bottle and filtration system, but can be significant compared to single-use plastic bottles.\n   - *Approximate Price:* $20-40\n\n*Important Note:* These CO₂ savings estimates are approximate and based on general comparisons. Actual savings may vary depending on specific product features, manufacturing processes, and recycling rates. \n\n*Actionable Recommendation:* Consider the sustainability benefits of the alternative products mentioned above and prioritize options that reduce material usage, promote recycling, and offer long-term durability. Encourage consumers to research specific products and manufacturers for detailed sustainability information. \n",
      ],
    },
  ]
)

response = chat_session.send_message("INSERT_INPUT_HERE")

print(response.text)