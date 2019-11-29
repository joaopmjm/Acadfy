import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import Exercise from '../models/exercise/ExerciseModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

@Controller('/exercises')
export default class ExerciseController {

  @Post('/', [checkJwt, checkRole])
  static async storeExercise(req, res) {
    const { trainer_id, name, description, gif } = req.body;

    const insert = await Exercise.create({
      trainer_id,
      name,
      description,
      gif
    });

    return res.success(insert);
  }

  @Get('/trainer', [checkJwt, checkRole])
  static async getExercises(req, res) {
    const trainer_id = req.locals.userId;
    return res.success(await Exercise.findByTrainer(trainer_id))
  }

  @Get('/description', [checkJwt, checkRole])
  static async getDescription(req, res) {
    const description = res.locals.description;
    return res.success(await Exercise.findByDescription(description))
  }

  @Get('/', [checkJwt, checkRole])
  static async findAll(req: BaseRequest, res: BaseResponse) {
    try {
      const exercises = await Exercise.find()
      return res.success(exercises)
    } catch (error) {
      console.error(error)
    }
  }
}
