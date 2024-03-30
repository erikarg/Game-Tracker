import { Router } from "express";
import LoginController from "../controllers/login.controller";
import {
  authorization,
  validateUsername,
  validatePassword,
} from "../middlewares/credentials";

const loginRoute = Router();

const loginController = new LoginController();

loginRoute.post(
  "/",
  authorization,
  validateUsername,
  validatePassword,
  loginController.userLogin
);

export default loginRoute;
