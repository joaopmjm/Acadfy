import { Model, BaseModel } from 'ts-framework-mongo';
import MainDatabase from '../../database';
import UserSchema from './UserSchema';
import * as bcrypt from 'bcryptjs';


@Model('Users')
class UserModel extends BaseModel {
  static Schema = UserSchema;

  public static async findByEmail(email: string) {
    return this.findOne({where:{email}})
  }

  public async setPassword(password: string) {
    try {
      this.password = await bcrypt.hash(password, 10)
    } catch (error) {
      console.error(error)
    }
  }

  public async validatePassword(password: string) {
    const matchPassword = await bcrypt.compare(password, this.password);
    return matchPassword
  }
}

export default MainDatabase.model(UserModel);
