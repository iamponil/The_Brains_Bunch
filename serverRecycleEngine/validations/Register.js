const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";
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
  // if(!validator.equals(data.password, data.confirmPassword)){
  //   errors.confirmPassword = "Passwords do not match";
  // }
  // if (validator.isEmpty(data.confirmPassword)) {
  //   errors.confirmPassword = "Required confirm";
  // }
  // if (validator.isEmpty(data.phone_number)) {
  //   errors.phone_number = "Required phone number";
  // }
  // if (validator.isEmpty(data.image)) {
  //   errors.image = "Required image";
  // }

  if( validator.isEmail(data.email)===false){
    errors.email="Invalid Email Address"
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
