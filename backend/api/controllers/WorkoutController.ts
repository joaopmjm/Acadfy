import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import Workout from '../models/workout/WorkoutModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { patch } from 'semver';
import { NODATA } from 'dns';

@Controller('/workouts')
export default class WorkoutController {

  @Post('/')
  static async storeWorkout(req, res) {

    const { name, userId, creator, exercises, day } = req.body;
    const workout = await Workout.create({
      name,
      userId,
      day,
      creator,
      exercises,
      counter: 0
    });
    return res.success(workout);
  }

  @Put('/:id', [checkJwt, checkRole])
  static async updateWorkout(req, res) {

    const filter = {id: req.params.id};
    const { name, userId, exercises, day} = req.body;
    const update = {
      name: name,
      userId: userId,
      exercises: exercises,
      day: day,
    }
    const workout = await Workout.findOneAndUpdate(filter, update);
    return res.success(workout);
  }

  @Post('/completeWorkout', [checkJwt])
  static async completeWorkout(req, res) {

    const {id} = req.body;
    const workout = await Workout.findOne({_id: id})
    const update = {counter: workout.counter+1}

    const newworkout = await Workout.findOneAndUpdate({_id: id}, update);
    return res.success(newworkout);
  }

  @Get('/training', [checkJwt])
  static async getWorkout(req, res) {
    
    const filter = res.locals.userId.id;
    const workout = await Workout.find({userId: filter});
    return res.success(workout);
  }

  @Get('/workoutCounter', [checkJwt])
  static async getWorkoutCounter(req, res) {
    
    const filter = res.locals.userId.id;
    const workout = await Workout.find({userId: filter});
    let nameAndCounter = {}
    for (var i = 0; i < workout.length; i++){
      const name = workout[i].name;
      const counter = workout[i].counter;
      nameAndCounter[name] = counter;
    }
    return res.success(nameAndCounter);
  }

  // @Get('/exercises', [checkJwt])
  // static async getWorkoutExercise(req, res) {
    
  //   const userId = res.locals.userId;
  //   const {exercises} = req.body;= {id:
  //   const workout = await Workout.findOne(filter, exercises)
  //   return res.success(workout)
  // }

  @Get('/', [checkJwt, checkRole])
  static async getWorkoutDay(req, res) {
    
    const {user, day} = req.body;
    const filter = {
      user: user,
      day: day
    };
    const workout = await Workout.findOne(filter);
    return res.success(workout);
  }
}
