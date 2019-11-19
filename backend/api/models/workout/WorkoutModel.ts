import { Model, BaseModel } from 'ts-framework-mongo';
import MainDatabase from '../../database';
import WorkoutSchema from './WorkoutSchema';
import * as bcrypt from 'bcryptjs';


@Model('Workouts')
class WorkoutModel extends BaseModel {
  static Schema = WorkoutSchema;

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

export default MainDatabase.model(WorkoutModel);
