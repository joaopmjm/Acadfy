import { BaseSchema } from 'ts-framework-mongo';

const AdminSchema = new BaseSchema({
  name: String,
  email: String,
  role: String,
  password: String,
  athletes: [],
  phone: String,
  cref: String
},                            { 
  timestamps: { createdAt: true, updatedAt: true },
});

export default AdminSchema;
