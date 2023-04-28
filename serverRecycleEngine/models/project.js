const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema(
  {
    name: { type: String},
    location:{type:String},
    remainingPeriod: { type: Date},
    fundGoal: { type: Number},
    content: { type: String },
    description: { type: String },
    category: { type:String},
    subtitle:{type:String},
    subCategory:{type:String},
    image : { type: String, default: "default.png" },
    video:{type:String},
    budget:{type:Number},
    launchingDate:{type:Number},
    duration:{type:Number},
    UserName:{type:String},
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
