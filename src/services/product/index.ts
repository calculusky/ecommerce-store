import { prisma } from "@/database";
import { Prisma } from "@prisma/client";
import { APIResponse } from "../interfaces";
import { DuplicateProductException } from "./errors";
import { CreateProductOptions } from "./interfaces";

export * from "./interfaces";
export * from "./errors";

export const findProductById = async (id: number) => {
    return await prisma.product.findUnique({ where: { id } });
};

export const createProduct = async (
    options: CreateProductOptions
): Promise<APIResponse> => {
    const existingProduct = await prisma.product.findFirst({
        where: { name: options.name },
    });

    if (existingProduct) {
        throw new DuplicateProductException("Product already exists");
    }

    const createProductOptions: Prisma.ProductCreateInput = {
        name: options.name,
        price: options.price,
        quantity: options.quantity,
    };

    const product = await prisma.product.create({
        data: createProductOptions,
    });

    return {
        success: true,
        message: "Product successfully created",
        data: {
            product: product,
        },
    };
};

export const getProducts = async (): Promise<APIResponse> => {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
    return {
        success: true,
        message: "Products successfully retrieved",
        data: {
            products: products,
        },
    };
};
