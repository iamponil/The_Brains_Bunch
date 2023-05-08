const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema(
  {
    cardId:{type:String},
    tokenId:{type:String},
    customerId:{type:String},
    balance:{type:String},
    email: {type:String},
    brand:{type:String},
    number: { type: Number },
    name: { type: String },
    exp_month: { type: String },
    exp_year: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    cvc: { type: String,  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payment", paymentSchema);