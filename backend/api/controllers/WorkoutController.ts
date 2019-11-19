import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import Workout from '../models/workout/WorkoutModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

@Controller('/workouts')
export default class WorkoutController {

  @Post('/', [checkJwt, checkRole])
  static async storeWorkout(req, res) {

    const { name, user, creator, exercises } = req.body;
    const workout = await Workout.create({
      name,
      user,
      creator,
      exercises,
      completed: false,
      counter: 0
    });
    return res.success(workout);
  }
}
