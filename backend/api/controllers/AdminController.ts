import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import Admin from '../models/Admin/AdminModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

@Controller('/Admins')
export default class AdminController {

  @Post('/', [checkJwt, checkRole])
  static async storeAdmin(req, res) {

    const { name, email, role, password, birthDate, athletes} = req.body;

    const Admindb = await Admin.findOne({email})

    if (Admindb) {
      throw new HttpError('Email registrado na plataforma, prossiga com o login', HttpCode.Client.FORBIDDEN);
    }

    const insert = await Admin.create({
      name,
      email,
      role,
      birthDate, 
      athletes
    });

    const Admin = await Admin.findOne({email})

    await Admin.setPassword(password);
    await Admin.save();

    return res.success(Admin);
  }

  @Get('/', [checkJwt, checkRole])
  static async findAll(req: BaseRequest, res: BaseResponse) {
    try {
      const Admins = await Admin.find()
      return res.success(Admins)
    } catch (error) {
      console.error(error)
    }
  }

  @Get('/athletes', [checkJwt, checkRole])
  static async findAll(req: BaseRequest, res: BaseResponse) {
    try {
      const athletes = await Admin.athletes()
      return res.success(athletes)
    } catch (error) {
      console.error(error)
    }
  }

  @Post('/:id', [checkJwt, checkRole])
  static async findAndUpdate(req, res) {
    const Admin = await Admin.findOneAndUpdate({
      email: req.body.email,
    },                                       {
      $set: { name: req.body.name },
    });

    return res.success(Admin);
  }
}
