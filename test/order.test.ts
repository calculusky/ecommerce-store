import request from "supertest";
import { prisma } from "../src/database";
import * as OrderService from "../src/services/order";
import * as AuthService from "../src/services/auth";
import createServer from "@/app";
import { Application } from "express";
import { customAlphabet, urlAlphabet } from "nanoid";

describe("Testing Order", () => {
    let app: Application;
    const rootPath = "/api/v1";
    const port = 3900;

    beforeAll(async () => {
        app = createServer({ port });
    });

    describe("[POST] /orders", () => {
        afterAll(jest.clearAllMocks);

        const createOrderOptions: OrderService.CreateOrderOptions = {
            items: [
                {
                    price: 20000,
                    productId: 3,
                    quantity: 2,
                },
                {
                    price: 50000,
                    productId: 5,
                    quantity: 2,
                },
            ],
        };

        it("create order should pass if customer is authenticated and passing the right order credentials", async () => {
            const identifier = customAlphabet(urlAlphabet, 20)();
            const token = AuthService.generateToken(identifier);
            prisma.user.findUnique = jest.fn().mockReturnValue({
                id: 4,
                identifier: identifier,
                firstName: "Peter",
                lastName: "Drury",
                email: "peterdrury@example.com",
            });
            prisma.order.create = jest.fn().mockReturnValue({
                id: 2,
                orderNo: customAlphabet(urlAlphabet, 12)(),
                userId: 4,
                totalPrice: 40000,
            });
            prisma.product.update = jest.fn();
            prisma.product.findUnique = jest.fn().mockReturnValue(true);

            const resp = await request(app)
                .post(`${rootPath}/orders`)
                .set({
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                })
                .send(createOrderOptions);

            expect(resp.status).toBe(201);
            expect(prisma.product.update).toHaveBeenCalledTimes(2);
            expect(prisma.order.create).toHaveBeenCalledTimes(1);
            expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.product.findUnique).toHaveBeenCalledTimes(2);
        });

        it("create order should fail if authentication token is invalid or expired", async () => {
            const resp = await request(app)
                .post(`${rootPath}/orders`)
                .set({
                    Accept: "application/json",
                    Authorization: `Bearer hbhbhgygyhuhhfhrujnvbhygyghd`,
                })
                .send(createOrderOptions);

            expect(resp.status).toBe(401);
        });
    });
});
