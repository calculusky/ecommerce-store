import * as dotenv from "dotenv";

import validate, {
    RequiredEnvironment,
    RequiredEnvironmentTypes,
} from "@boxpositron/vre";
export * from "./constants";

dotenv.config();

const runtimeEnvironment: RequiredEnvironment[] = [
    {
        name: "PORT",
        type: RequiredEnvironmentTypes.Number,
    },
    {
        name: "JWT_SECRET",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "ALLOWED_DOMAINS",
        type: RequiredEnvironmentTypes.StringArray,
        delimiter: ",",
    },
];

validate(runtimeEnvironment);

export const isProduction: boolean = process.env.NODE_ENV === "production";
export const port: number = parseInt(process.env.PORT ?? "4200");
export const jwtSecret: string = process.env.JWT_SECRET;
export const allowedDomains: string[] =
    process.env.ALLOWED_DOMAINS?.split(",") ?? [];
