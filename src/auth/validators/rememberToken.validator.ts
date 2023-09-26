import { check } from "express-validator";
import validator from "../../middlewares/validator";
import { query } from "express";

const rememberTokenValidator = [
  check("token").notEmpty().withMessage("token is required"),
  check("id").notEmpty().withMessage("user id is required"),
  validator.validate,
];

export default rememberTokenValidator;
