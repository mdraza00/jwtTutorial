import express, { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import loginRouter from "./router/loginRouter";
import registerRouter from "./router/registerRouter";

const app: Express = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie Parser
app.use(cookieParser());

// Mounting Routers
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

export default app;
