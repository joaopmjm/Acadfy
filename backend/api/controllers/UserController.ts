import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import User from '../models/user/UserModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

@Controller('/users')
export default class UserController {

  @Post('/', [checkJwt, checkRole])
  static async storeUser(req, res) {

    const { name, email, role, password } = req.body;

    const userdb = await User.findOne({email})

    if (userdb) {
      throw new HttpError('Email registrado na plataforma, prossiga com o login', HttpCode.Client.FORBIDDEN);
    }

    const insert = await User.create({
      name,
      email,
      role
    });

    const user = await User.findOne({email})

    await user.setPassword(password);
    await user.save();

    return res.success(user);
  }

  @Get('/', [checkJwt, checkRole])
  static async findAll(req: BaseRequest, res: BaseResponse) {
    try {
      const users = await User.find()
      return res.success(users)
    } catch (error) {
      console.error(error)
    }
  }

  @Post('/:id', [checkJwt, checkRole])
  static async findAndUpdate(req, res) {
    const user = await User.findOneAndUpdate({
      email: req.body.email,
    },                                       {
      $set: { name: req.body.name },
    });

    return res.success(user);
  }

  @Post('/update', [checkJwt, checkRole])
  static async findAndUpdate(req, res) {
    const user = await User.findOneAndUpdate({
      email: req.body.email,
    },                                       {
      $set: {
          name: req.body.name,
          weight: req.body.weight,
          height: req.body.height,
          birthdate: req.body.birthdate,
          gender: req.body.gender
      },
    });

    return res.success(user);
  }
}
