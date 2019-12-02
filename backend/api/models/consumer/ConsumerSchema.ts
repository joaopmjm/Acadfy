import { BaseSchema } from 'ts-framework-mongo';

const ConsumerSchema = new BaseSchema({
  name: String,
  email: String,
  role: "consumer",
  password: String,
  height: Number,
  weight: Number,
  birthDate: String,
  personal: String
},                            { 
  timestamps: { createdAt: true, updatedAt: true },
});

export default ConsumerSchema;
