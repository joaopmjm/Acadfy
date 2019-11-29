import { BaseSchema } from 'ts-framework-mongo';

const WorkoutSchema = new BaseSchema({
  name: String,
  userId: String,
  day: [],
  creator: String,
  exercises: [],
  counter: Number,
});

export default WorkoutSchema;

