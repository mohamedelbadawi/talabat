import { Router } from "express";
import { AuthController } from "./Auth.controller";
import registerValidator from "./validators/Register.validator";
import LoginValidator from "./validators/Login.validator";
import forgetPasswordValidator from "./validators/forgetpassword.validator";
import rememberTokenValidator from "./validators/rememberToken.validator";
import resetPasswordValidator from "./validators/resetPassword.Validator";

const authRouter = Router();

authRouter.post("/register", registerValidator, AuthController.register);
authRouter.post("/login", LoginValidator, AuthController.login);
authRouter.post(
  "/forget-password",
  forgetPasswordValidator,
  AuthController.forgetPassword
);
authRouter.get(
  "/verify-token",
  rememberTokenValidator,
  AuthController.verifyToken
);

authRouter.post(
  "/reset-password",
  resetPasswordValidator,
  AuthController.resetPassword
);
export default authRouter;
