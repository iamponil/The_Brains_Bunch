from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np

# Load the trained LSTM model
model = load_model('model.h5')
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Load input data from the request body
    input_data = request.form.to_dict()
    print(input_data)

    # Extract input features from the input data
    year = int(input_data['year'])
    plastic_waste = int(input_data['plastic_waste'])
    temperature = int(input_data['temperature'])
    precipitation = int(input_data['precipitation'])
    gdp = int(input_data['gdp'])
    population = int(input_data['population'])

    # Create a numpy array with the input data
    input_data = np.array([[year, plastic_waste, temperature, precipitation, gdp, population]])

    # Use the model to make a prediction
    prediction = model.predict(input_data)
    predicted_waste = str(prediction[0][0].astype(float))

    # Return the predicted plastic waste as a JSON response
    return jsonify({'predicted_waste': predicted_waste})

if __name__ == '__main__':
    app.run(debug=True, port=5001)

    




