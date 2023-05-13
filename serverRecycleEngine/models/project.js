const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String },
    fundGoal: { type: Number },
    fundGoalProgress: { type: Number, default: 0 },
    category: { type: String },
    subtitle: { type: String },
    image: { type: String },
    video: { type: String },
    launchingDate: { type: Date },
    duration: { type: Number, default:0,min: 0 },
    UserName: { type: String },
    status: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    comment: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    likes: { type: Number, default: 0 },
    analytics: { type: Number },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "user" }],
    dislikes: { type: Number, default: 0 },
    dislikedBy: [{ type: Schema.Types.ObjectId, ref: "user" }],
    ratings: [{ type: Number, min: 1, max: 5 }],
    averageRating: { type: Number, default: 0 },
    fundedProject: [{ type: Schema.Types.ObjectId, ref: "projectFunded" }],
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("project", projectSchema);
