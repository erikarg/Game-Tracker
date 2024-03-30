import connection from "../models/connection";
import UsersModel from "../models/users.model";
import { IUser } from "../interfaces/index";

export default class UsersService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async insertNewUser(user: IUser): Promise<IUser> {
    const userData = await this.model.createUser(user);
    return userData;
  }
}
