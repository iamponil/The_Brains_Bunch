const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectFundedSchema = new mongoose.Schema(
  {

   card: { type: Schema.Types.ObjectId, ref: "card" },
   project: { type: Schema.Types.ObjectId, ref: "project" },
   reservedAmount:{type:Number}
  },


  {
    timestamps: true,
  }
);
module.exports = mongoose.model("projectFunded", projectFundedSchema);
