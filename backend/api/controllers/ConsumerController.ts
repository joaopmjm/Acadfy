import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import { ConsumerModel } from '../models/consumer/';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

@Controller('/users')
export default class UserController {

  @Post('/', [checkJwt, checkRole])
  static async storeUser(req, res) {

    const { name, email, role, password, height, weight, birthDate, personal} = req.body;

    const userdb = await ConsumerModel.findOne({email})

    if (userdb) {
      throw new HttpError('Email registrado na plataforma, prossiga com o login', HttpCode.Client.FORBIDDEN);
    }

    const insert = await ConsumerModel.create({
      name,
      email,
      role,
      height, 
      weight, 
      birthDate, 
      personal
    });

    const user = await ConsumerModel.findOne({email})

    await user.setPassword(password);
    await user.save();

    return res.success(user);
  }

  @Get('/', [checkJwt, checkRole])
  static async findAll(req: BaseRequest, res: BaseResponse) {
    try {
      const users = await ConsumerModel.find()
      return res.success(users)
    } catch (error) {
      console.error(error)
    }
  }

  @Post('/:id', [checkJwt, checkRole])
  static async findAndUpdate(req, res) {
    const user = await ConsumerModel.findOneAndUpdate({
      email: req.body.email,
    },                                       {
      $set: { name: req.body.name },
    });

    return res.success(user);
  }
}
