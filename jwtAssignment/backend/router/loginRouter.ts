import express, { Express } from "express";

const authenticateController = require("../controller/authenticateController");
const app: Express = express();

const loginRouter = express.Router();

loginRouter.post("/", authenticateController.loginUser);

export default loginRouter;
