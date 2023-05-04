const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    location:{type:String, required: true},
    fundGoal: { type: Number},
    category: { type:String, required: true},
    subtitle: { type:String},
    image : { type: String, default: "default.png" },
    video:{type:String},
    launchingDate:{type:Date},
    duration:{type:Number},
    UserName:{type:String},
    status : { type: Boolean, default:false },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  

  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("project", projectSchema);
