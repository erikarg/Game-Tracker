import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ErrorMessage from "../helpers/errors";

dotenv.config();

const secret = process.env.JWT_SECRET;

const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: ErrorMessage.tokenNotFound });
  }
  try {
    const checkToken = jwt.verify(authorization as string, secret as string);
    req.body.user = checkToken;
    next();
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: ErrorMessage.invalidToken });
  }
};

export default authToken;
