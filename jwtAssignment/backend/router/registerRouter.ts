import express, { Express } from "express";
const authenticateController = require("../controller/authenticateController");
const app: Express = express();

const registerRouter = express.Router();

registerRouter.post("/", authenticateController.registerNewUser);

export default registerRouter;
