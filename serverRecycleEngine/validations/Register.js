const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";
  data.image = !isEmpty(data.image) ? data.image : "";
  if (validator.isEmpty(data.name)) {
    errors.name = "Required name";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }
  // if(!validator.equals(data.password, data.confirm)){
  //   errors.confirm = "Passwords does not match";
  // }
  // if (validator.isEmpty(data.confirm)) {
  //   errors.confirm = "Required confirm";
  // }
  if (validator.isEmpty(data.phone_number)) {
    errors.phone_number = "Required phone number";
  }
  // if (validator.isEmpty(data.image)) {
  //   errors.image = "Required image";
  // }
  

  return {
      errors,
      isValid: isEmpty(errors)
  }
};