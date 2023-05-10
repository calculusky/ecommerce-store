import * as dotenv from "dotenv";

import validate, {
    RequiredEnvironment,
    RequiredEnvironmentTypes,
} from "@boxpositron/vre";
export * from "./constants";

dotenv.config();

const runtimeEnvironment: RequiredEnvironment[] = [
    {
        name: "DATABASE_URL",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "JWT_SECRET",
        type: RequiredEnvironmentTypes.String,
    },
];

validate(runtimeEnvironment);

export const isProduction: boolean = process.env.NODE_ENV === "production";
export const port: number = parseInt(process.env.NODE_DOCKER_PORT ?? "4200");
export const jwtSecret: string = process.env.JWT_SECRET;
export const allowedDomains: string[] =
    process.env.ALLOWED_DOMAINS?.split(",") ?? [];
