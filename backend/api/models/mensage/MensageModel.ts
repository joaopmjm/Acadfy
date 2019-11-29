import { Model, BaseModel } from 'ts-framework-mongo';
import MainDatabase from '../../database';
import MensageSchema from './MensageSchema';
import * as bcrypt from 'bcryptjs';
export enum UserRole{
  ADMIN = "admin",
  CONSUMER = "consumer"
}

@Model('Mensage')
class MensageModel extends BaseModel {
  static Schema = MensageSchema;

  public static async getHistoric() {
    return this
  }

}

export default MainDatabase.model(MensageModel);
