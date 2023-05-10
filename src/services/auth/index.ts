import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { customAlphabet, urlAlphabet } from "nanoid";
import { JwtPayload, LoginOptions, SignupOptions } from "./interfaces";
import * as UserService from "@/services/user";
import { jwtSecret, SESSION_DURATION } from "@/config";
import { Prisma, User } from "@prisma/client";
import {
    DuplicateUserException,
    InvalidCredentialException,
    TokenGenerationException,
} from "./errors";
import { APIResponse } from "../interfaces";
export * from "./interfaces";

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export const validateToken = async (token: string): Promise<User> => {
    const { id: identifier } = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = await UserService.findUserByIdentifier(identifier);
    return user;
};

export const generateToken = (identifier: string): string => {
    if (!identifier) {
        throw new TokenGenerationException("User identifier is required");
    }
    const payload: JwtPayload = {
        id: identifier,
        createdAt: Date.now(),
    };

    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: SESSION_DURATION,
    });

    return token;
};

export const signup = async (options: SignupOptions): Promise<APIResponse> => {
    const user = await UserService.findUserByEmail(options.email);
    if (user) {
        throw new DuplicateUserException(
            "An account with the email already exists"
        );
    }
    const hashedPassword = await hashPassword(options.password);
    const createUserOptions: Prisma.UserCreateInput = {
        firstName: options.firstName,
        lastName: options.lastName,
        email: options.email,
        identifier: customAlphabet(urlAlphabet, 20)(),
        password: hashedPassword,
    };

    const createdUser = await UserService.createUser(createUserOptions);
    const accessToken = generateToken(createdUser.identifier);
    return {
        success: true,
        message: "Account successfully created",
        data: {
            accessToken,
        },
    };
};

export const login = async (options: LoginOptions): Promise<APIResponse> => {
    const user = await UserService.findUserByEmail(options.email);
    if (!user) {
        throw new InvalidCredentialException("Incorrect email or password");
    }

    const isValidPassword = await comparePassword(
        options.password,
        user.password
    );
    if (!isValidPassword) {
        throw new InvalidCredentialException("Incorrect email or password");
    }
    const accessToken = generateToken(user.identifier);
    return {
        success: true,
        message: "User successfully logged in",
        data: {
            accessToken,
        },
    };
};
