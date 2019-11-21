import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post } from 'ts-framework';
import { ConsumerModel } from '../models/Consumer';
import JwtService from '../services/JwtService';

@Controller('/Consumerauth')
export default class AuthController {

  /**
   * GET /auth/
   * 
   * @description A sample controller.
   */
  @Get('/')
  static async sample(req: BaseRequest, res: BaseResponse) {
    throw new HttpError('Method not implemented yet', HttpCode.Server.INTERNAL_SERVER_ERROR);
  }


  @Post('/login')
  static async logIn(req: BaseRequest, res: BaseResponse) {
    try {
      
      const { email, password } = req.body;

      const Consumerdb = await ConsumerModel.findOne({email})

      console.log(Consumerdb)

      if (!Consumerdb) {
        throw new HttpError('Email não registrado na plataforma', HttpCode.Client.NOT_FOUND);
      }

      const matchPassword = await Consumerdb.validatePassword(password);

      if (!matchPassword){
        throw new HttpError('Senha incorreta, tente novamente', HttpCode.Client.FORBIDDEN);
      }

      else if (matchPassword) {
        const token = await JwtService.createSignToken(Consumerdb);
        return res.success(token);
      }

    } catch (error) {
      console.error(error)
    }
  }

  @Post('/register')
  static async register(req: BaseRequest, res: BaseResponse) { 
    try {

      const { name, email, password, height, weight, birthDate, personal } = req.body;

      const Consumerdb = await ConsumerModel.findOne({email})

      if (Consumerdb) {
        throw new HttpError('Email registrado na plataforma, prossiga com o login', HttpCode.Client.FORBIDDEN);
      }

      const insert = await ConsumerModel.create({
        name,
        email,
        role: 'consumer',
        height, 
        weight, 
        birthDate, 
        personal
      });
  
      const Consumer = await ConsumerModel.findOne({email})
  
      await Consumer.setPassword(password);
      await Consumer.save();

      return res.success("Registro confirmado na plataforma")

    } catch (error) {
      return res.error(error)
    }
  }
}
