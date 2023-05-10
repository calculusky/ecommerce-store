import { prisma } from "@/database";
import { Prisma, User } from "@prisma/client";
import { customAlphabet, urlAlphabet } from "nanoid";
import { APIResponse } from "../interfaces";
import { CreateOrderOptions, GetOrdersQueryOptions } from "./interfaces";
import * as ProductService from "../product";
import { EmptyOrderItemException } from "./errors";

export * from "./interfaces";
export * from "./errors";

export const createOrder = async (
    options: CreateOrderOptions,
    user: User
): Promise<APIResponse> => {
    if (!options.items.length) {
        throw new EmptyOrderItemException("Please select a product to order");
    }

    //check if the selected product exists
    const totalPrice: number = options.items.reduce(
        (acc, val) => acc + val.price * val.quantity,
        0
    );

    const items = options.items.map(async (item) => {
        const product = await ProductService.findProductById(item.productId);
        if (!product) {
            throw new ProductService.ProductNotFoundException(
                "One of the products selected does not exist"
            );
        }
        return {
            price: item.price,
            productId: item.productId,
            quantity: item.quantity,
        };
    });

    const itemOptions: Prisma.OrderItemCreateManyOrderInput[] =
        await Promise.all(items);

    const createOrderOptions: Prisma.OrderCreateInput = {
        orderNo: customAlphabet(urlAlphabet, 12)(),
        totalPrice: totalPrice,
        items: { createMany: { data: itemOptions } },
        user: { connect: { id: user.id } },
    };

    //save data
    const createdOrder = await prisma.$transaction(async (tx) => {
        const createOrder = await tx.order.create({
            data: createOrderOptions,
        });

        //update product qty
        for (let i = 0; i < options.items.length; i++) {
            await tx.product.update({
                where: { id: options.items[i].productId },
                data: {
                    quantity: { decrement: options.items[i].quantity },
                },
            });
        }
        return createOrder;
    });

    return {
        success: true,
        message: "Order successfully created",
        data: {
            order: createdOrder,
        },
    };
};

export const getOrders = async (
    userId: number,
    options: GetOrdersQueryOptions
): Promise<APIResponse> => {
    //define pagination
    const page = +options.page || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    let orderBy: Prisma.OrderOrderByWithRelationInput[] = [
        { createdAt: "desc" },
    ];
    if (options.priceFilter) {
        orderBy = [{ totalPrice: options.priceFilter }, ...orderBy];
    }

    const orderCount = await prisma.order.count();
    const orders = await prisma.order.findMany({
        where: { userId: userId },
        take: limit,
        skip: offset,
        include: {
            items: {
                select: {
                    price: true,
                    quantity: true,
                    product: { select: { name: true } },
                },
            },
        },

        orderBy: orderBy, //[{ createdAt: "desc" }],
    });
    const result = {
        metadata: {
            perPage: limit,
            page,
            pageCount: orders.length,
            totalCount: orderCount,
        },
        orders: orders,
    };

    return {
        success: true,
        message: "Orders successfully retrieved",
        data: result,
    };
};
