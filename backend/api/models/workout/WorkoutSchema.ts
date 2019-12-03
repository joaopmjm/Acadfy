import { BaseSchema } from 'ts-framework-mongo';

const WorkoutSchema = new BaseSchema({
  consumerId: String,
  day: String,
  trainerId: String,
  exercises: [],
  counter: Number,
  workout: ["perna", "braço", "ombro", "costas","peito"]
});

export default WorkoutSchema;

