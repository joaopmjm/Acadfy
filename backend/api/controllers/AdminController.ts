import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import AdminModel from '../models/admin/AdminModel';
import ConsumerModel from '../models/consumer/ConsumerModel';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

@Controller('/admin')
export default class AdminController {

  @Post('/', [checkJwt, checkRole])
  static async storeAdmin(req, res) {

    const { name, email, role, password, birthDate, athletes} = req.body;

    const admindb = await AdminModel.findOne({email})

    if (admindb) {
      throw new HttpError('Email registrado na plataforma, prossiga com o login', HttpCode.Client.FORBIDDEN);
    }

    const insert = await AdminModel.create({
      name,
      email,
      role: "admin",
      birthDate, 
      athletes
    });

    const admin = await AdminModel.findOne({email})

    await admin.setPassword(password);
    await admin.save();

    return res.success(admin);
  }

  @Get('/', [checkJwt, checkRole])
  static async findAllAdmin(req: BaseRequest, res: BaseResponse) {
    try {
      const admin = await AdminModel.find()
      return res.success(admin)
    } catch (error) {
      console.error(error)
    }
  }

  @Get('/athletes', [checkJwt, checkRole])
  static async findAll(req: BaseRequest, res: BaseResponse) {

    try {
      const id = res.locals.userId.id;
      const admin = await AdminModel.findById({_id:id});
      const athletesList = []

      for (const i in admin.athletes) {
        athletesList.push(await ConsumerModel.findById({i}))
      }
      return res.success(athletesList)

  } catch (error) {
    console.error(error)
  }
}

@Post('/:id', [checkJwt, checkRole])
static async findAndUpdate(req: BaseRequest, res: BaseResponse) {
  const admin = await AdminModel.findOneAndUpdate({
    email: req.body.email,
  },                                       {
    $set: { name: req.body.name },
  });

  return res.success(admin);
}
}
