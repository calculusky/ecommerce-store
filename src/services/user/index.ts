import { prisma } from "@/database";
import { Prisma } from "@prisma/client";

export const createUser = async (options: Prisma.UserCreateInput) => {
    return await prisma.user.create({
        data: options,
    });
};

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
};

export const findUserByIdentifier = async (identifier: string) => {
    return await prisma.user.findUnique({ where: { identifier: identifier } });
};
