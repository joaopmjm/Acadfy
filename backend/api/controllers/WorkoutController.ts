import { Controller, Get, BaseRequest, BaseResponse, Post, Put } from 'ts-framework';
import Workout from '../models/workout/WorkoutModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import WorkoutModel from '../models/workout/WorkoutModel';
import { ExerciseModel } from '../models/exercise';

@Controller('/workouts')
export default class WorkoutController {

  @Post('/', [checkJwt, checkRole])
  static async storeExerciseWorkout(req: BaseRequest, res: BaseResponse) {
    try {

      const { consumerId, day, name, series, repetition} = req.body;
      const training = await WorkoutModel.findOne({consumerId, day});

      let workoutdb;

      if (!training) {
        const workout = await Workout.create({
          consumerId,
          day,
          trainerId: res.locals.userId.id,
          counter: 0
        });
        workoutdb = await WorkoutModel.findOne({consumerId, day})
      } else {
        workoutdb = training
      }

      const exercise = await ExerciseModel.create({
        consumerId,
        name,
        trainerId: res.locals.userId.id,
        series,
        repetition
      });

      await workoutdb.exercises.push(exercise.id)

      await workoutdb.save()

      return res.success("Exércio adicionado ao treino com sucesso")
      
    } catch (error) {
      return res.error(error)
    }
  }

  @Post('/', [checkJwt, checkRole])
  static async listWorkout(req: BaseRequest, res: BaseResponse) {
    try {
      
      const { consumerId, day } = req.body;
      const training = await WorkoutModel.findOne({consumerId, day});

      const exercises = []

      for (const i in training.exercises) {
        exercises.push(await ExerciseModel.findOne({_id:training.exercises[i]}))
      }

      return res.success(exercises)

    } catch (error) {
      return res.error(error)
    }
  }

    @Post('/consumer', [checkJwt])
    static async getWorkoutDay(req: BaseRequest, res: BaseResponse) {
      try {

        const { day } = req.body;
        const training = await WorkoutModel.findOne({consumerId: res.locals.userId.id, day});
  
        const exercises = []
  
        for (const i in training.exercises) {
          exercises.push(await ExerciseModel.findOne({_id:training.exercises[i]}))
        }
  
        return res.success(exercises)

      } catch (error) {
        return res.error(error)
      }

    }

  // @Post('/')
  // static async storeWorkout(req: BaseRequest, res: BaseResponse) {

  //   const { name, userId, creator, exercises, day } = req.body;
  //   const workout = await Workout.create({
  //     name,
  //     userId,
  //     day,
  //     creator,
  //     exercises,
  //     counter: 0
  //   });
  //   return res.success(workout);
  // }

  @Put('/:id', [checkJwt, checkRole])
  static async updateWorkout(req: BaseRequest, res: BaseResponse) {

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
  static async completeWorkout(req: BaseRequest, res: BaseResponse) {

    const {id} = req.body;
    const workout = await Workout.findOne({_id: id})
    const update = {counter: workout.counter+1}

    const newworkout = await Workout.findOneAndUpdate({_id: id}, update);
    return res.success(newworkout);
  }

  @Get('/training', [checkJwt])
  static async getWorkout(req: BaseRequest, res: BaseResponse) {

    const filter = res.locals.userId.id;
    const workout = await Workout.find({userId: filter});
    return res.success(workout);
  }

  @Get('/workoutCounter', [checkJwt])
  static async getWorkoutCounter(req: BaseRequest, res: BaseResponse) {

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
  // static async getWorkoutExercise(req: BaseRequest, res: BaseResponse) {

  //   const userId = res.locals.userId;
  //   const {exercises} = req.body;= {id:
  //   const workout = await Workout.findOne(filter, exercises)
  //   return res.success(workout)
  // }


}
