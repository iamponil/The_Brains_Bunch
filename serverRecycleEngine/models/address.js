const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAddressSchema = new mongoose.Schema(
  {
  streetAdress:{type :String},
  city:{type :String},
  state:{type :String},
  zipCode:{type :String},
  country:{type :String},
    user_id: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("address", userAddressSchema);