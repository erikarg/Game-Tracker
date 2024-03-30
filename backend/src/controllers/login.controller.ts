import { Request, Response } from "express";
import HttpStatus from "http-status";
import LoginService from "../services/login.service";
import { createToken } from "../utils/token";
import ErrorMessage from "../helpers/errors";

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public userLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await this.loginService.validateData(username, password);
    if (result) {
      const token = createToken(result.id);
      res.status(HttpStatus.OK).json({ token });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: ErrorMessage.invalidPassword });
    }
  };
}
