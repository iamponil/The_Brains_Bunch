const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema(
  {
    number: { type: Number },
    name: { type: String },
    expiry: { type: String },
    cvc: { type: String,  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payment", paymentSchema);