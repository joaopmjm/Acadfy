import { BaseSchema } from 'ts-framework-mongo';

const WorkoutSchema = new BaseSchema({
  consumerId: String,
  day: [],
  trainerId: String,
  exercises: [],
  counter: Number,
});

export default WorkoutSchema;

