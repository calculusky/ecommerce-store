import {
    JsonWebTokenError,
    TokenExpiredError,
    NotBeforeError,
} from "jsonwebtoken";

import * as AuthService from "@/services/auth";

import {
    MissingAuthorizationHeaderException,
    InvalidAuthorizationHeaderException,
    UnauthorizedException,
} from "./errors";

import { Controller } from "@/controllers/interfaces";
import { User } from "@prisma/client";

export const isAuthenticated: Controller<User> = async (req, _res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            throw new MissingAuthorizationHeaderException(
                "Authorization header is missing"
            );
        }

        if (!authorizationHeader.startsWith("Bearer ")) {
            throw new InvalidAuthorizationHeaderException(
                "Authorization header is invalid"
            );
        }
        const token = authorizationHeader.split(" ")[1];
        const user = await AuthService.validateToken(token);
        req.user = user;
        next();
    } catch (err) {
        const error = err as JsonWebTokenError;

        switch (true) {
            case err instanceof NotBeforeError: {
                next(new UnauthorizedException("You came too early"));
                break;
            }

            case err instanceof TokenExpiredError: {
                next(new UnauthorizedException("Your session has expired"));
                break;
            }

            case error.message.includes("jwt malformed"): {
                next(new UnauthorizedException("Your session is invalid"));
                break;
            }

            case err instanceof JsonWebTokenError: {
                next(new UnauthorizedException(error.message));
                break;
            }

            default: {
                next(err);
                break;
            }
        }
    }
};
