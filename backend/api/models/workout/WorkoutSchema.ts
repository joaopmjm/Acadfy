import { BaseSchema } from 'ts-framework-mongo';

const WorkoutSchema = new BaseSchema({
  consumerId: String,
  role: String,
  day: String,
  trainerId: String,
  exercises: [],
  counter: Number,
});

export default WorkoutSchema;

