const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    date: {
      type: Date,
      required: true
    }
  });
  // const Login = mongoose.model('Login', loginSchema);
  // module.exports = Login;
  module.exports = mongoose.model('login', loginSchema);