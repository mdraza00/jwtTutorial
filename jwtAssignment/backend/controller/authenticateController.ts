import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";
import { Mongoose, HydratedDocument } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const jwtSalt = "This is my super secret key to create json web token";

const genereateJWT: (user: HydratedDocument<IUser>) => string = (user) => {
  return jwt.sign({ email: user.email, password: user.password }, jwtSalt, {
    expiresIn: "5m",
  });
};

exports.registerNewUser = async function (req: Request, res: Response) {
  if (!req.cookies.jwtToken) {
    const { email, password } = req.body;

    const newUser: HydratedDocument<IUser> = await User.create({
      email,
      password,
    });

    const token = genereateJWT(newUser);

    res.status(200).cookie("jwtToken", token).json({
      status: "success",
      message: "creating new user",
    });
  } else {
    const { email, password } = jwt.verify(
      req.cookies.jwtToken,
      jwtSalt
    ) as JwtPayload;
    if (await User.findOne({ email, password })) {
      res.status(200).json({
        status: "success",
        message: "You are logged in",
      });
    } else {
      res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }
  }
};

exports.loginUser = async function (req: Request, res: Response) {
  if (req.cookies.jwtToken) {
    const { email, password } = jwt.verify(
      req.cookies.jwtToken,
      jwtSalt
    ) as JwtPayload;
    if (await User.findOne({ email, password })) {
      res.status(200).json({
        status: "success",
        message: "Your logged in",
      });
    } else {
      res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }
  } else {
    res.status(401).json({
      status: "failed",
      message: "No token or Invalid Token",
    });
  }
};
