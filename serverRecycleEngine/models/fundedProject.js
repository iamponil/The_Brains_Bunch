const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectFundedSchema = new mongoose.Schema(
  {

   cards: [{ type: Schema.Types.ObjectId, ref: "card" }],
   project: { type: Schema.Types.ObjectId, ref: "project" },
   reservedAmount:{type:Number, default: 0, min: 0 },
  },


  {
    timestamps: true,
  }
);
module.exports = mongoose.model("projectFunded", projectFundedSchema);
