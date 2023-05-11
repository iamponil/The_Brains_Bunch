
import numpy as np
from keras.models import load_model

# Load the trained LSTM model
model = load_model('model.h5')

  # Load input data from the request body
input_data = request.body
print(input_data)
# Define the input data for the year 2025
year = 2025
plastic_waste = 10000
temperature = 25
precipitation = 50
gdp = 50000
population = 1000000

# Create a numpy array with the input data
input_data = np.array([[year, plastic_waste, temperature, precipitation, gdp, population]])

# Normalize the input data if necessary
# ...

# Use the model to make a prediction
prediction = model.predict(input_data)

# Print the predicted plastic waste for the year 2025
print('Predicted plastic waste for 2025:', prediction[0][0])