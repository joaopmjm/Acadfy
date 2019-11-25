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

  public async putMensage(  name: String, role: UserRole, msn: String) {

    try {

      this.name = name
      this.role = role
      this.msn = msn

    } catch (error) {
      console.error(error)
    }
  }

}

export default MainDatabase.model(MensageModel);
