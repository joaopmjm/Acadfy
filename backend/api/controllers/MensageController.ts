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

  @Post('/mensage')
  static async logIn(req: BaseRequest, res: BaseResponse) {
    try {
      
      const {name, role, msn} = req.body;

      const put = await Mensage.putMensage(name, role, msn)


    } catch (error) {
      console.error(error)
    }
  }
}
