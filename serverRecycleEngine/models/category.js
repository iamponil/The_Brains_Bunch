const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = Schema(
  {
    recycle_type: { unique: true, type: String, default: null },
    logo: { type: String, default: null },
    project: [{ type: Schema.Types.ObjectId, ref: "project" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("category", categorySchema);
