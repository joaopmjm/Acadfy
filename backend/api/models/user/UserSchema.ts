import { BaseSchema } from 'ts-framework-mongo';

const UserSchema = new BaseSchema({
  name: String,
  email: String,
  role: ["admin", "consumer"],
  password: String,
  height: String,
  weight: String,
  birthDate: String,
  personal: String
},                            { 
  timestamps: { createdAt: true, updatedAt: true },
});

export default UserSchema;
