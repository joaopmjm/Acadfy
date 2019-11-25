import { BaseRequest, BaseResponse, HttpError, HttpCode } from "ts-framework";
import { NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { JwtConfig } from "../../config";
import { UserModel } from "../models/user";
import JwtService from "../services/JwtService";

export const checkJwt = async (req: BaseRequest, res: BaseResponse, next: NextFunction) => {

    const token = req.headers['token'];
    let userId;

    try {
        userId = jwt.verify(token, JwtConfig.privateKey);
    } catch (error) {
        throw new HttpError("Token inválido", HttpCode.Client.UNAUTHORIZED)
    }

    const userdb = await UserModel.findOne(userId);
    const newToken = await JwtService.createSignToken(userdb)

    res.locals.token = newToken;
    res.locals.userId = userId;

    next();
}