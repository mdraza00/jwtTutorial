"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateController = require("../controller/authenticateController");
const app = (0, express_1.default)();
const loginRouter = express_1.default.Router();
loginRouter.post("/", authenticateController.loginUser);
exports.default = loginRouter;