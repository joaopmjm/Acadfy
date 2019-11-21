import { Model, BaseModel } from 'ts-framework-mongo';
import MainDatabase from '../../database';
import WorkoutSchema from './WorkoutSchema';
import * as bcrypt from 'bcryptjs';


@Model('Workouts')
class WorkoutModel extends BaseModel {
  static Schema = WorkoutSchema;

}

export default MainDatabase.model(WorkoutModel);
