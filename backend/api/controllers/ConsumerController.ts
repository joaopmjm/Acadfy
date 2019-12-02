import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post, Put } from 'ts-framework';
import { ConsumerModel } from '../models/consumer/';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { AdminModel } from '../models/admin';

@Controller('/consumer')
export default class UserController {

  @Post('/', [checkJwt, checkRole]) 
  static async storeUser(req: BaseRequest, res: BaseResponse) {

    const { name, email, password, height, weight, birthDate, trainerId } = req.body;

    const userdb = await ConsumerModel.findOne({email})

    if (userdb) {
      throw new HttpError('Email registrado na plataforma, prossiga com o login', HttpCode.Client.FORBIDDEN);
    }

    const insert = await ConsumerModel.create({
      name,
      email,
      role: "consumer",
      height, 
      weight, 
      birthDate, 
      trainerId
    });

    const consumer = await ConsumerModel.findOne({email})
  
    await consumer.setPassword(password);
    await consumer.save();

    const admin = await AdminModel.findOne({_id:trainerId})
    await admin.athletes.push(consumer._id)

    await admin.save()
    
    return res.success(consumer);
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

  @Post('/update', [checkJwt])
  static async findAndUpdate(req: BaseRequest, res: BaseResponse) {
    try {
      const id = res.locals.userId.id;
      const { name, email, weight, height, birthdate, gender } = req.body;
      const consumer = await ConsumerModel.findById({_id:id});

      if(consumer) {
        consumer.name = name
        consumer.email = email
        consumer.weight = weight
        consumer.height = height
        consumer.birthDate = birthdate
        consumer.gender = gender
      }

      await consumer.save()

      return res.success("Consumidor atualizado com sucesso")
    } catch (error) {
      return res.error(error)
    }
  }


  // @Post('/update_trainer', [checkJwt, checkRole])
  // static async updateTrainer(req: BaseRequest, res: BaseResponse) {
  //   const user = await ConsumerModel.findOneAndUpdate({
  //     email: req.body.email,
  //   }, {
  //     $set: {
  //         name: req.body.name,
  //         email: req.body.email,
  //         telephone: req.body.telephone,
  //         cref: req.body.cref,
  //         gender: req.body.gender
  //     },
  //   });

  //   return res.success(user);
  // }
}
