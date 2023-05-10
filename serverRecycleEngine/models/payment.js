const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema(
  {
    cardId:{type:String},
    tokenId:{type:String},
    customerId:{type:String},
    balance:{type:Number},
    email: {type:String},
    brand:{type:String},
    reservedAmount:{type:Number},
    number: { type: String },
    name: { type: String },
    exp_month: { type: String },
    exp_year: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    cvc: { type: Number  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payment", paymentSchema);