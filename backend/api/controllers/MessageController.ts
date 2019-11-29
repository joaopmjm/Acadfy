import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import Message from '../models/message/MessageModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

@Controller('/message')
export default class MessageController {

  @Get('/history',[checkJwt])
  static async hist(req: BaseRequest, res: BaseResponse) {
    const {admin_id,user_id} = req.body;

    const historic = await Message.find({ admin_id: admin_id, user_id:user_id});

    return res.success(historic);

  }

  @Post('/admin_message',[checkJwt,checkRole])
  static async adMSN(req: BaseRequest, res: BaseResponse) {
    try {
      
      const {name, role, msn,admin_id,user_id} = req.body;
      const insert = await Message.create({
      name,
      role,
      msn,
      admin_id,
      user_id
    });

    return res.success(insert);

    } catch (error) {
      console.error(error)
    }
  }

  @Post('/user_message',[checkJwt])
  static async usMSN(req: BaseRequest, res: BaseResponse) {
    try {
      
      const {name, role, msn,admin_id,user_id} = req.body;
      const insert = await Message.create({
      name,
      role,
      msn,
      admin_id,
      user_id
    });

    return res.success(insert);

    } catch (error) {
      console.error(error)
    }
  }
}
