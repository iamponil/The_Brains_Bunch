const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// only a backer who have backed X project can comment on the X project 
const projectUpdateCommentSchema = new mongoose.Schema(
  {
    content: { type: String },
    user: [{ type: Schema.Types.ObjectId, ref: "user" }],
    project:[{type: Schema.Types.ObjectId, ref: "project"}],
    update:  { type: Schema.Types.ObjectId, ref: "update" },
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("comment", projectUpdateCommentSchema);