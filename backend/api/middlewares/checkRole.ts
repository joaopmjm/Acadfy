import { BaseRequest, BaseResponse, HttpError, HttpCode } from "ts-framework";
import { NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { JwtConfig } from "../../config";
import { ConsumerModel } from "../models/consumer";
import { AdminModel } from "../models/admin";

export const checkRole = async (req: BaseRequest, res: BaseResponse, next: NextFunction) => {

    const token = req.headers['token'];
    let userId;

    try {
        userId = jwt.verify(token, JwtConfig.privateKey);
    } catch (error) {
        throw new HttpError("Token inválido", HttpCode.Client.UNAUTHORIZED)
    }

    let userdb;

    userdb = await ConsumerModel.findOne({_id:userId.id});

    if (!userdb) {
        userdb = await AdminModel.findOne({_id:userId.id})
        if(!userdb) {
            throw new HttpError("Token inválido", HttpCode.Client.UNAUTHORIZED)
        }
    }

    if (userdb.role == "admin") {
        next()
    } else {
        throw new HttpError("Não autorizado", HttpCode.Client.UNAUTHORIZED)
    }
}
