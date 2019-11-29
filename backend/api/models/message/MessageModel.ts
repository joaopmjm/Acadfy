import { Model, BaseModel } from 'ts-framework-mongo';
import MainDatabase from '../../database';
import MessageSchema from './MessageSchema';
import * as bcrypt from 'bcryptjs';
export enum UserRole{
  ADMIN = "admin",
  CONSUMER = "consumer"
}

@Model('Message')
class MessageModel extends BaseModel {
  static Schema = MessageSchema;

  public static async getHistoric() {
    return this
  }
}

export default MainDatabase.model(MessageModel);
