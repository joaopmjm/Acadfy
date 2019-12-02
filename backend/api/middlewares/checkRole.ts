import { BaseRequest, BaseResponse, HttpError, HttpCode } from "ts-framework";
import { NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { JwtConfig } from "../../config";
import { UserModel } from "../models/user";

export const checkRole = async (req: BaseRequest, res: BaseResponse, next: NextFunction) => {

    const token = req.headers['token'];
    let userId;

    try {
        userId = jwt.verify(token, JwtConfig.privateKey);
    } catch (error) {
        throw new HttpError("Token inválido", HttpCode.Client.UNAUTHORIZED)
    }

    let id = userId;

    const userdb = await UserModel.findById(id.id);

    if (userdb.role == "admin") {
        next()
    } else {
        throw new HttpError("Não autorizado", HttpCode.Client.UNAUTHORIZED)
    }
}
