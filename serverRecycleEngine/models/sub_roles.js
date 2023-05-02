const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subroleSchema = new mongoose.Schema(
  {
    sub_role: {
        type: String,
        enum: ['BACKER','CREATOR','SUPERBACKER']
      },
    project: [{ type: Schema.Types.ObjectId, ref: "project" }],
    user_id: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("address", subroleSchema);