import { BaseRequest, BaseResponse, HttpError, HttpCode } from "ts-framework";
import { NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { JwtConfig } from "../../config";
import JwtService from "../services/JwtService";
import { ConsumerModel } from "../models/consumer";
import { AdminModel } from "../models/admin";

export const checkJwt = async (req: BaseRequest, res: BaseResponse, next: NextFunction) => {

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

    const newToken = await JwtService.createSignToken(userdb)

    res.locals.token = newToken;
    res.locals.userId = userId;

    next();
}