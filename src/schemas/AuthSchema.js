import joi from "joi";

const signSchema = joi
  .object({
    name: joi.string().required().min(3).empty(""),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeat_password: joi.ref("password"),
  })
  .with("password", "repeat_password");

const loginSchema = joi.object({
  email: joi.string().email().required().empty(""),
  password: joi.string().required(),
});

const transactionSchema = joi.object({
  value: joi.number().empty("").required(),
  description: joi.string().min(3).max(30).empty("").required(),
  type: joi.string().required(),
});

export { signSchema, loginSchema, transactionSchema };
