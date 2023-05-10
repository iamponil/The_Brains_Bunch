const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new mongoose.Schema({
  content: String,
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
  });

  module.exports = mongoose.model("story", contentSchema);
  