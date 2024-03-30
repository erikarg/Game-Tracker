import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status";
import { IUser } from "../interfaces/index";
import ErrorMessage from "../helpers/errors";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as IUser;
  if (!username) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: ErrorMessage.missingUsername });
  }
  if (!password) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: ErrorMessage.missingPassword });
  }
  next();
};

export const validateUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;
  if (typeof username !== "string") {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: ErrorMessage.invalidUsernameType });
  }
  if (username.length < 3) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: ErrorMessage.invalidUsernameLength });
  }
  next();
};

export const validatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  if (typeof password !== "string") {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: ErrorMessage.invalidPasswordType });
  }
  if (password.length < 8) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: ErrorMessage.invalidPasswordLength });
  }
  next();
};
