import express from "express";
import UsersController from "../controllers/users.controller";
import {
  authorization,
  validateUsername,
  validatePassword,
} from "../middlewares/credentials";

const usersRoute = express.Router();

const usersController = new UsersController();

usersRoute.use(authorization);

usersRoute.post(
  "/",
  validateUsername,
  validatePassword,
  usersController.registerNewUser
);

export default usersRoute;
