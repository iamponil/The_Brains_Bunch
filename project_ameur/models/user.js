const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone_number: { type: String },
    address: { type: Schema.Types.ObjectId , ref:"address" },
    image: { type: String, default: "default.png" },
    // role 0 = super , 1 normal admin , 2 backer 3 creator  we will see if those can be one role or not . 
    role: {
      type: String,
      enum: ['SUPERADMIN', 'RECYCLENGINEAGENT','BACKER','CREATOR']
    },
    project: [{ type: Schema.Types.ObjectId, ref: "project" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
