import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post } from 'ts-framework';
import { AdminModel } from '../models/Admin';
import JwtService from '../services/JwtService';

@Controller('/Adminauth')
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

      const Admindb = await AdminModel.findOne({email})

      console.log(Admindb)

      if (!Admindb) {
        throw new HttpError('Email não registrado na plataforma', HttpCode.Client.NOT_FOUND);
      }

      const matchPassword = await Admindb.validatePassword(password);

      if (!matchPassword){
        throw new HttpError('Senha incorreta, tente novamente', HttpCode.Client.FORBIDDEN);
      }

      else if (matchPassword) {
        const token = await JwtService.createSignToken(Admindb);
        return res.success(token);
      }

    } catch (error) {
      console.error(error)
    }
  }

  @Post('/register')
  static async register(req: BaseRequest, res: BaseResponse) { 
    try {

      const { name, email, password, birthDate, athletes } = req.body;

      const Admindb = await AdminModel.findOne({email})

      if (Admindb) {
        throw new HttpError('Email registrado na plataforma, prossiga com o login', HttpCode.Client.FORBIDDEN);
      }

      const insert = await AdminModel.create({
        name,
        email,
        role: 'Admin',
        birthDate, 
        athletes
      });
  
      const Admin = await AdminModel.findOne({email})
  
      await Admin.setPassword(password);
      await Admin.save();

      return res.success("Registro confirmado na plataforma")

    } catch (error) {
      return res.error(error)
    }
  }
}
