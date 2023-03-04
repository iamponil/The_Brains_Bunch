const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// only the creator can make updates

const projectUpdateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true  },
    description: { type: String },
    like: { type: Number},
    user: [{ type: Schema.Types.ObjectId, ref: "user" }],
    comment: [ { type: Schema.Types.ObjectId, ref: "comments" }],
    //we can add an image to the update 
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("update", projectUpdateSchema);
