import { BaseSchema } from 'ts-framework-mongo';

const ExerciseSchema = new BaseSchema({
  trainerId: String,
  name: String,
  series: String,
  repetition: String,
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

export default ExerciseSchema;
