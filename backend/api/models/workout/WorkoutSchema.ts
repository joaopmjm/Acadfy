import { BaseSchema } from 'ts-framework-mongo';

const WorkoutSchema = new BaseSchema({
  name: String,
  role: String,
  consumerId: String,
  trainerId: String,
  day: [],
  exercises: [],
  counter: Number,
});

export default WorkoutSchema;

