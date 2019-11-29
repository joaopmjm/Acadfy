import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post } from 'ts-framework';
import { AdminModel } from '../models/admin';
import { ConsumerModel } from '../models/consumer';

import JwtService from '../services/JwtService';

@Controller('/auth')
export default class AuthController {

  @Post('/login')
  static async logIn(req: BaseRequest, res: BaseResponse) {
    try {
      
      const { email, password } = req.body;

      const consumerdb = await ConsumerModel.findOne({email})

      if (!consumerdb) {
        throw new HttpError('Email não registrado na plataforma', HttpCode.Client.NOT_FOUND);
      }

      const matchPassword = await consumerdb.validatePassword(password);

      if (!matchPassword){
        throw new HttpError('Senha incorreta, tente novamente', HttpCode.Client.FORBIDDEN);
      }

      else if (matchPassword) {
        const token = await JwtService.createSignToken(consumerdb);
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

      const consumerdb = await ConsumerModel.findOne({email})

      if (consumerdb) {
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
  
      const consumer = await ConsumerModel.findOne({email})
  
      await consumer.setPassword(password);
      await consumer.save();

      return res.success("Registro confirmado na plataforma")

    } catch (error) {
      return res.error(error)
    }
  }

  @Post('/login-admin')
  static async logInAdmin(req: BaseRequest, res: BaseResponse) {
    try {
      
      const { email, password } = req.body;

      const admindb = await AdminModel.findOne({email})

      if (!admindb) {
        throw new HttpError('Email não registrado na plataforma', HttpCode.Client.NOT_FOUND);
      }

      const matchPassword = await admindb.validatePassword(password);

      if (!matchPassword){
        throw new HttpError('Senha incorreta, tente novamente', HttpCode.Client.FORBIDDEN);
      }

      else if (matchPassword) {
        const token = await JwtService.createSignToken(admindb);
        return res.success(token);
      }

    } catch (error) {
      console.error(error)
    }
  }

  @Post('/register-admin')
  static async registerAdmin(req: BaseRequest, res: BaseResponse) { 
    try {

      const { name, email, password, birthDate, athletes } = req.body;

      const admindb = await AdminModel.findOne({email})

      if (admindb) {
        throw new HttpError('Email registrado na plataforma, prossiga com o login', HttpCode.Client.FORBIDDEN);
      }

      const insert = await AdminModel.create({
        name,
        email,
        birthDate, 
        athletes
      });
  
      const admin = await AdminModel.findOne({email})
  
      await admin.setPassword(password);
      await admin.save();

      return res.success("Registro confirmado na plataforma")

    } catch (error) {
      return res.error(error)
    }
  }
}
