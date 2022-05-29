import express, { Request, Response } from "express";
import { user, userModel } from "../models/user";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../middleware/verifyAuthToken";

const model = new userModel();

const index = async (_req: Request, res: Response) => {
  try {
  const users = await model.index();
  res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
  const user = await model.show(req.params.id);
  res.json(user);
    } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const u: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const newUser = await model.create(u);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
};

export default userRoutes;
