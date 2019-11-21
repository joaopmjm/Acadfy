import { BaseSchema } from 'ts-framework-mongo';

const AdminSchema = new BaseSchema({
  name: String,
  email: String,
  role: ["admin", "consumer"],
  password: String,
  birthDate: String,
  athletes: Array,
},                            { 
  timestamps: { createdAt: true, updatedAt: true },
});

export default AdminSchema;
