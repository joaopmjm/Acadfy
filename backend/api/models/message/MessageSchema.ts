import { BaseSchema } from 'ts-framework-mongo';

const MessageSchema = new BaseSchema({
  name: String,
  role: ["admin", "consumer"],
  msn: String,
  admin_id: String,
  user_id: String
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

export default MessageSchema;
