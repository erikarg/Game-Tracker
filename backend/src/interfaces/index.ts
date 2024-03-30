export interface IUser {
  id?: number;
  name: string;
  lastname: string;
  birthday: string;
  username: string;
  password: string;
}
export interface IToken {
  id?: number;
  type?: string;
  message?: string;
}
