"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jwtSalt = "This is my super secret key to create json web token";
const genereateJWT = (user) => {
    return jsonwebtoken_1.default.sign({ email: user.email, password: user.password }, jwtSalt, {
        expiresIn: "5m",
    });
};
exports.registerNewUser = async function (req, res) {
    if (!req.cookies.jwtToken) {
        const { email, password } = req.body;
        const newUser = await userModel_1.default.create({
            email,
            password,
        });
        const token = genereateJWT(newUser);
        res.status(200).cookie("jwtToken", token).json({
            status: "success",
            message: "creating new user",
        });
    }
    else {
        const { email, password } = jsonwebtoken_1.default.verify(req.cookies.jwtToken, jwtSalt);
        if (await userModel_1.default.findOne({ email, password })) {
            res.status(200).json({
                status: "success",
                message: "You are logged in",
            });
        }
        else {
            res.status(401).json({
                status: "failed",
                message: "User not found",
            });
        }
    }
};
exports.loginUser = async function (req, res) {
    if (req.cookies.jwtToken) {
        const { email, password } = jsonwebtoken_1.default.verify(req.cookies.jwtToken, jwtSalt);
        if (await userModel_1.default.findOne({ email, password })) {
            res.status(200).json({
                status: "success",
                message: "Your logged in",
            });
        }
        else {
            res.status(401).json({
                status: "failed",
                message: "User not found",
            });
        }
    }
    else {
        res.status(401).json({
            status: "failed",
            message: "No token or Invalid Token",
        });
    }
};
