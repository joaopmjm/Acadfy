import { BaseSchema } from 'ts-framework-mongo';

const MensageSchema = new BaseSchema({
  name: String,
  role: ["admin", "consumer"],
  msn: String
},                            { 
  timestamps: { createdAt: true, updatedAt: true },
});

export default MensageSchema;