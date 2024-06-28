"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const loginRouter_1 = __importDefault(require("./router/loginRouter"));
const registerRouter_1 = __importDefault(require("./router/registerRouter"));
const app = (0, express_1.default)();
// Body Parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Cookie Parser
app.use((0, cookie_parser_1.default)());
// Mounting Routers
app.use("/api/login", loginRouter_1.default);
app.use("/api/register", registerRouter_1.default);
exports.default = app;
