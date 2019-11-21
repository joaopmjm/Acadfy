import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import Workout from '../models/workout/WorkoutModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { patch } from 'semver';

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

  @Put('/:id', [checkJwt])
  static async updateWorkout(req, res) {

    const filter = {id: req.params.id};
    const { name, user, exercises, counter, completed } = req.body;
    const update = {
      name: name,
      user: user,
      exercises: exercises,
      counter: counter,
      completed: completed
    }
    const workout = await Workout.findOneAndUpdate(filter, update);
    return res.success(workout);
  }

  @Get('/:id', [checkJwt])
  static async getWorkout(req, res) {
    
    const filter = {id: req.params.id};
    const workout = await Workout.findOne(filter);
    return res.success(workout);
  }
}
