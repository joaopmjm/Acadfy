import { BaseSchema } from 'ts-framework-mongo';

const ConsumerSchema = new BaseSchema({
  name: String,
  email: String,
  role: String,
  password: String
},                            { 
  timestamps: { createdAt: true, updatedAt: true },
});

export default ConsumerSchema;
