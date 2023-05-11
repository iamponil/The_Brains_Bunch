const request = require("request");

exports.getPredictions = async (req, res) => {
  console.log(req.body);
  const options = {
    method: "POST",
    url: "http://127.0.0.1:5001/predict",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      year: req.body.year,
      plastic_waste: req.body.plastic_waste,
      temperature: "25",
      precipitation: req.body.precipitation,
      gdp: "5000000",
      population: req.body.population,
    },
  };

  request(options, function (error, response, body) {
    if (error) {
      console.error(error);
      return res.status(500).send({ error: "Something went wrong" });
    }

    const { predicted_waste } = JSON.parse(body);
    console.log(predicted_waste);
    return res.send(predicted_waste);
  });
};
