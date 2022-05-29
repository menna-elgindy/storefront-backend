import express, { Request, Response } from "express";
import { orderModel } from "../models/order";
import verifyAuthToken from "../middleware/verifyAuthToken";

const model = new orderModel();

const showCurrentOrder = async (req: Request, res: Response) => {
  try {
  const order = await model.showCurrentOrder(req.params.user_id);
  res.json(order);
    } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders/:user_id", verifyAuthToken, showCurrentOrder);
};

export default orderRoutes;
