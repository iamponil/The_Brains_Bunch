const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String/*, required: true*/ },
    phone_number: { type: String },
    image: { type: String, default: "default.png" },
    provider : {type: String,
    enum:['google','facebook','github']},
    // role 0 = super , 1 normal admin , 2 backer 3 creator  we will see if those can be one role or not . 
    role: {type:String,
    enum :['SUPERADMIN','ADMIN','CLIENT'] },
     address: { type: Schema.Types.ObjectId , ref:"address" },
 project: [{ type: Schema.Types.ObjectId, ref: "project" }],
    sub_roles:[{ type: Schema.Types.ObjectId , ref:"sub_roles" }]
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);