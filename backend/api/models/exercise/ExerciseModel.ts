import { Model, BaseModel } from 'ts-framework-mongo';
import MainDatabase from '../../database';
import ExerciseSchema from './ExerciseSchema';

@Model('Exercises')
class ExerciseModel extends BaseModel {
  static Schema = ExerciseSchema;

  public static async findByTrainer(trainer_id: String) {
    return this.find({trainer_id: trainer_id})
  }
}

export default MainDatabase.model(ExerciseModel);
