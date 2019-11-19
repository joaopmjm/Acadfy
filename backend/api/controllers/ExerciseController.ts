import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import Exercise from '../models/exercise/ExerciseModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

@Controller('/exercises')
export default class ExerciseController {

  // @Post('/', [checkJwt, checkRole])
  @Post('/')
  static async storeExercise(req, res) {
    console.log(req.body)

    const { trainer_id, name, description, gif } = req.body;

    // const exercisedb = await Exercise.findByTrainer({trainer_id})

    // if (exercisedb) {
    //   throw new HttpError('Exercício já registrado na plataforma', HttpCode.Client.FORBIDDEN);
    // }

    const insert = await Exercise.create({
      trainer_id,
      name,
      description,
      gif
    });

    const exercise = await Exercise.findByTrainer({trainer_id})

    // await exercise.setPassword(password);
    await exercise.save();

    return res.success(exercise);
  }

  // @Get('/', [checkJwt, checkRole])
  @Get('/')
  static async findAll(req: BaseRequest, res: BaseResponse) {
    try {
      const exercises = await Exercise.find()
      return res.success(exercises)
    } catch (error) {
      console.error(error)
    }
  }



  // @Post('/:id', [checkJwt, checkRole])
  // static async findAndUpdate(req, res) {
  //   const exercise = await Exercise.findOneAndUpdate({
  //     email: req.body.email,
  //   },                                       {
  //     $set: { name: req.body.name },
  //   });

  //   return res.success(exercise);
  // }
}
