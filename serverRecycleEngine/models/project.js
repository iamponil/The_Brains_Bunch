const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true  },
    remainingPeriod: { type: Date, required: true },
    fundGoal: { type: Number, required: true },
    content: { type: String },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "category" },
    image : { type: String, default: "default.png" },
    rewardOption : { type: String },
    status : { type: Boolean, default:false },
    user: [{ type: Schema.Types.ObjectId, ref: "user" }],
    update: [ { type: Schema.Types.ObjectId, ref: "update" }],
    comment: [ { type: Schema.Types.ObjectId, ref: "comment" }],

  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("project", projectSchema);
