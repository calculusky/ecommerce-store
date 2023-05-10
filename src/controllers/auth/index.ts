import * as AuthService from "@/services/auth";
import { Controller } from "../interfaces";
export * as Schema from "@/services/auth/schema";

export const signup: Controller = async (req, res, next) => {
    try {
        const options: AuthService.SignupOptions = req.body;
        const data = await AuthService.signup(options);
        return res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

export const login: Controller = async (req, res, next) => {
    try {
        const options: AuthService.LoginOptions = req.body;
        const data = await AuthService.login(options);
        return res.json(data);
    } catch (error) {
        next(error);
    }
};
