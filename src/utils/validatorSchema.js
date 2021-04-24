import Joi from "joi";

const name = Joi.string().min(5).max(255).required().label("Name");
const email = Joi.string().email().required().label("Email");
const password = Joi.string().min(5).max(16).label("Password");
const confirmPassword = Joi.ref("password");

const loginValidate = Joi.object().keys({
  email,
  password,
});

const registerValidate = Joi.object().keys({
  name,
  email,
  password,
  confirmPassword,
});

export { loginValidate, registerValidate };
