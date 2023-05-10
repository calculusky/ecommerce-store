import { NextFunction, Request as Req, Response } from "express";

export interface Request<TUser> extends Req {
    user: TUser;
}

export type Controller<TUser = void> = (
    req: TUser extends void ? Req : Request<TUser>,
    res: Response,
    next: NextFunction
) => any | Promise<any>;
