import { Document } from "mongoose";

export interface IUser extends Document {
  __id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
