import request from "supertest";
import { prisma } from "../src/database";
import * as AuthService from "../src/services/auth";
import * as bcrypt from "bcryptjs";
import createServer from "@/app";
import { customAlphabet, urlAlphabet } from "nanoid";
import { Application } from "express";

describe("Testing Auth", () => {
    let app: Application;
    const rootPath = "/api/v1";
    const port = 3900;

    beforeAll(async () => {
        app = createServer({ port });
    });

    describe("[POST] /signup", () => {
        afterAll(jest.clearAllMocks);

        it("should pass when all credentials are correct", async () => {
            const signupOptions: AuthService.SignupOptions = {
                firstName: "John",
                lastName: "Smith",
                email: "johnsmith@example.com",
                password: "q1w2e3r4!",
            };

            prisma.user.findUnique = jest.fn().mockReturnValue(null);
            prisma.user.create = jest.fn().mockReturnValue({
                id: 1,
                identifier: customAlphabet(urlAlphabet, 20)(),
                firstName: signupOptions.firstName,
                lastName: signupOptions.lastName,
                email: signupOptions.email,
                password: await bcrypt.hash(signupOptions.password, 10),
            });

            const resp = await request(app)
                .post(`${rootPath}/auth/signup`)
                .send(signupOptions);

            expect(resp.status).toBe(201);
            expect(prisma.user.create).toHaveBeenCalledTimes(1);
        });

        it("should fail when one of the credentials is incorrect or missing", async () => {
            const signupOptions: Omit<AuthService.SignupOptions, "password"> = {
                firstName: "John",
                lastName: "Smith",
                email: "johnsmithexample.com",
            };

            prisma.user.findUnique = jest.fn().mockReturnValue(null);
            prisma.user.create = jest.fn().mockReturnValue({
                id: 1,
                identifier: customAlphabet(urlAlphabet, 20)(),
                firstName: signupOptions.firstName,
                lastName: signupOptions.lastName,
                email: signupOptions.email,
                password: await bcrypt.hash("password", 10),
            });

            const resp = await request(app)
                .post(`${rootPath}/auth/signup`)
                .send(signupOptions);

            expect(resp.status).toBe(422);
            expect(prisma.user.create).toHaveBeenCalledTimes(0);
        });
    });

    describe("[POST] /login", () => {
        afterAll(jest.clearAllMocks);

        it("should pass if all credentials are correct", async () => {
            const loginOptions: AuthService.LoginOptions = {
                email: "johnsmith@example.com",
                password: "q1w2e3r4!",
            };

            prisma.user.findUnique = jest.fn().mockReturnValue({
                identifier: customAlphabet(urlAlphabet, 20)(),
                password: await bcrypt.hash(loginOptions.password, 10),
            });
            const resp = await request(app)
                .post(`${rootPath}/auth/login`)
                .send(loginOptions);

            expect(resp.status).toBe(200);
            expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
        });
    });
});
