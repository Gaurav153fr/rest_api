import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bycrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  //validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }
  try {
    //Databse call
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(400, "User already exist with this email");
      return next(error);
    }
  } catch (err) {
    return next(createHttpError(500, "Error while finding user"));
  }

  //password
  const hashedPassword = await bycrypt.hash(password, 5);

  let newUser: User;
  try {
    newUser = await userModel.create({
      name: name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating new user"));
  }

  try {
    //Token generation
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while signing jwt token"));
  }
};

export { createUser };
