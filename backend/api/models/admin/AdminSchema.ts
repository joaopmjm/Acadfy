import { BaseSchema } from 'ts-framework-mongo';

const AdminSchema = new BaseSchema({
  name: String,
  email: String,
  role: "admin",
  password: String,
  birthDate: String,
  athletes: [],
},                            { 
  timestamps: { createdAt: true, updatedAt: true },
});

export default AdminSchema;
