import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express, { Application } from "express";
import routes from "@/routes";

export interface CreateServerOptions {
    port: number;
    production?: boolean;
    whitelistedDomains?: string[];
}

export default (options: CreateServerOptions): Application => {
    const app = express();
    const whitelist = options.whitelistedDomains ?? [];
    const corsOptions: CorsOptions = {
        origin: async (origin, callback) => {
            if (!origin) return callback(null, true);

            if (whitelist.indexOf(origin) !== -1) {
                return callback(null, true);
            }
            callback(new Error(`Not allowed by CORS - ${origin}`));
        },
        allowedHeaders: ["Authorization", "X-Requested-With", "Content-Type"],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    };

    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(morgan(options.production ? "combined" : "dev"));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(routes);
    return app;
};
