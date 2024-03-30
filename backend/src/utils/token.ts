import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IToken } from "../interfaces";

dotenv.config();

const secret = process.env.JWT_SECRET;

export function createToken(id: number | undefined) {
  const conf = {
    expiresIn: "1d",
    algorithm: "HS256",
  };

  const token = jwt.sign({ id }, secret as string, conf as object);
  return token;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, secret as string);
    return decoded;
  } catch (error) {
    console.log(error);
  }
}

export function decodeToken(token: string): IToken {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  return decoded as IToken;
}
