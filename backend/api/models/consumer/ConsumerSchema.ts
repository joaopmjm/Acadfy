import { BaseSchema } from 'ts-framework-mongo';

const ConsumerSchema = new BaseSchema({
  name: String,
  email: String,
  role: String,
  password: String,
  weight: String,
  height: String,
  birthdate: String,
  gender: String,
  trainerId: String
},                            { 
  timestamps: { createdAt: true, updatedAt: true },
});

export default ConsumerSchema;
