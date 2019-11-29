import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import Mensage from '../models/mensage/MensageModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

@Controller('/mensage')
export default class MensageController {

  @Get('/history')
  static async sample(req: BaseRequest, res: BaseResponse) {
    
    const historic = await Mensage.getHistoric();

    return res.success(historic);

  }

  @Post('/admin_mensage')
  static async adMSN(req: BaseRequest, res: BaseResponse) {
    try {
      
      const {name, role, msn,admin_id,user_id} = req.body;
      const insert = await Mensage.create({
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

  @Post('/user_mensage')
  static async usMSN(req: BaseRequest, res: BaseResponse) {
    try {
      
      const {name, role, msn,admin_id,user_id} = req.body;
      const insert = await Mensage.create({
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
