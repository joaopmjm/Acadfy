import { BaseSchema } from 'ts-framework-mongo';

const ExerciseSchema = new BaseSchema({
  trainer_id: String,
  name: String,
  description: String,
  gif: String,
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

export default ExerciseSchema;
