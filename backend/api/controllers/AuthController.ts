import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post } from 'ts-framework';
import { UserModel } from '../models/user';
import JwtService from '../services/JwtService';

@Controller('/auth')
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

      const userdb = await UserModel.findOne({email})

      console.log(userdb)

      if (!userdb) {
        throw new HttpError('Email não registrado na plataforma', HttpCode.Client.NOT_FOUND);
      }

      const matchPassword = await userdb.validatePassword(password);

      if (!matchPassword){
        throw new HttpError('Senha incorreta, tente novamente', HttpCode.Client.FORBIDDEN);
      }

      else if (matchPassword) {
        const token = await JwtService.createSignToken(userdb);
        return res.success(token);
      }

    } catch (error) {
      console.error(error)
    }
  }

  @Post('/register')
  static async register(req: BaseRequest, res: BaseResponse) { 
    try {

      const { name, email, password } = req.body;

      const userdb = await UserModel.findOne({email})

      if (userdb) {
        throw new HttpError('Email registrado na plataforma, prossiga com o login', HttpCode.Client.FORBIDDEN);
      }

      const insert = await UserModel.create({
        name,
        email,
        role: 'consumer'
      });
  
      const user = await UserModel.findOne({email})
  
      await user.setPassword(password);
      await user.save();

      return res.success("Registro confirmado na plataforma")

    } catch (error) {
      return res.error(error)
    }
  }
}
