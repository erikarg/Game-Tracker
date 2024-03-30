import Joi from "joi";
import connection from "../models/connection";
import LoginModel from "../models/login.model";
import { IUser } from "../interfaces/index";

export default class LoginService {
  loginModel = new LoginModel(connection);

  validateData = async (
    username: string,
    password: string
  ): Promise<IUser | null> => {
    const schema = Joi.object<IUser>({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const result = schema.validate(username, password as any);
    const userData = await this.loginModel.validateLogin(username, password);
    if (result.error) {
      throw new Error(result.error.details[0].message);
    }
    return userData;
  };
}
