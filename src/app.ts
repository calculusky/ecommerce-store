import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express, { Application } from "express";
import routes from "@/routes";

export interface CreateServerOptions {
    port: number;
    production?: boolean;
}

export default (options: CreateServerOptions): Application => {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(morgan(options.production ? "combined" : "dev"));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(routes);
    return app;
};
