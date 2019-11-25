import { Model, BaseModel } from 'ts-framework-mongo';
import MainDatabase from '../../database';
import ExerciseSchema from './ExerciseSchema';

@Model('Exercises')
class ExerciseModel extends BaseModel {
  static Schema = ExerciseSchema;

  public static async findByTrainer(trainer_id: String) {
    //return this.find({trainer_id: trainer_id})
    // return this.find({where:{trainer_id}})
    return await this.find({trainer_id})
  }

  public static async findByDescription(description: String) {
    return await this.find({description})
  }
}

export default MainDatabase.model(ExerciseModel);
