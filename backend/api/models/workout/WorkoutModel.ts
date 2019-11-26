import { Model, BaseModel } from 'ts-framework-mongo';
import MainDatabase from '../../database';
import WorkoutSchema from './WorkoutSchema';
import * as bcrypt from 'bcryptjs';


@Model('Workouts')
class WorkoutModel extends BaseModel {
  static Schema = WorkoutSchema;

  // public static async findExercises(exercises: []) {
  //   return await this.find({exercises})
  // }

}

export default MainDatabase.model(WorkoutModel);
