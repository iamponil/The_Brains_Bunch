# Recycle Engine

## Overview

Recycle Engine is a web application built with the MERN stack and Flask for AI prediction. It is a platform that focuses on recycling projects in Africa, inspired by Kickstarter.com, with a user-friendly front office for project creators and a back office for administrators. The system utilizes a Flask application to process machine learning models imported from Kaggle, and a Node.js server to handle user interactions and data.

## Features

- **User Roles:**
  - **Creators:** Users who can create recycling projects.
  - **Backers:** Users who can support projects financially.

- **Project Creation:**
  - Projects go through four phases:
    1. **Creating Basics:** Project creators provide essential information.
    2. **Creating Analytics:** Predicts the environmental impact of the project by considering factors like:
       - Plastic Waste
       - Temperature
       - Precipitation
       - GDP
       - Population
    3. **Tagging:** Projects receive tags (green, yellow, or red) based on their environmental impact.
    4. **Funding:** Projects must reach their funding goal within a specified timeframe to receive financial support.

- **PowerBI Integration:**
  - The back office features a PowerBI graph to provide data visualization and insights.

## Project Phases

### 1. Creating Basics

In this phase, project creators provide basic information about their recycling project.

### 2. Creating Analytics

In the "Creating Analytics" phase, the system predicts the environmental impact of the project for future years. This prediction is based on several key factors, including plastic waste, temperature, precipitation, GDP, and population. 

### 3. Project Tagging

Projects are tagged based on their environmental impact prediction. Tags can be one of the following:
- Green: Low environmental impact
- Yellow: Moderate environmental impact
- Red: High environmental impact

### 4. Funding

To receive funding, projects must reach their funding goal within a specified period. If the goal is not met, the project will not receive any funds.

## Screenshots

### Back Office - PowerBI Graph
![image](https://github.com/iamponil/The_Brains_Bunch/assets/75281628/14153cad-fb55-4984-930c-a107dd70ef02)

### Project Tagging
![image](https://github.com/iamponil/The_Brains_Bunch/assets/75281628/77f758e9-badb-42aa-afc0-6adf2016d895)

## Installation

To run the Recycle Engine project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/recycle-engine.git`
2. Navigate to the project directory: `cd recycle-engine`

### Back Office

1. Navigate to the back office directory:
2. Install dependencies:
3. Start the back office server on port 3001:

### Front Office

1. Navigate to the front office directory:
2. Install dependencies:
3. Start the front office:

### Flask Application

1. Navigate to the Flask application directory:
2. Install dependencies:
3. Start the Flask application:

### Flask Prediction Module

1. Navigate to the Flask Prediction Module directory:
2. Install TensorFlow:
3. Start the Flask prediction module:
Please ensure you have the necessary dependencies installed and configured for each component.
Note: Make sure to install the required dependencies and configurations for each 

## Contributors

- Ameur Nemlaghi (ameur.nemlaghi@esprit.tn)
- Marwa Memmi (marwa.memmi@esprit.tn)

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This project is inspired by [Kickstarter](https://www.kickstarter.com/).
- Data for environmental predictions is sourced from Kaggle.

Feel free to contribute to this project or report any issues!
