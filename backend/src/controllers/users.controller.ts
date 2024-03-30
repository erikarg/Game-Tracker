import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";
import UsersService from "../services/users.service";
import { IUser } from "../interfaces";
import { createToken } from "../utils/token";

export default class UsersController {
  constructor(private usersService = new UsersService()) {}

  public registerNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, lastname, birthday, username, password }: IUser = req.body;
      const result = await this.usersService.insertNewUser({
        name,
        lastname,
        birthday,
        username,
        password,
      });
      const token = createToken(result.id);
      res.status(HttpStatus.CREATED).json({ token });
    } catch (err) {
      next(err);
    }
  };
}
