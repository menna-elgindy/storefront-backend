import express, { Request, Response } from "express";
import { product, productModel } from "../models/product";
import verifyAuthToken from "../middleware/verifyAuthToken";

const model = new productModel();

const index = async (_req: Request, res: Response) => {
  try {
  const products = await model.index();
  res.json(products);
    } catch (err) {
    res.status(400);
    res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
  try {
  const product = await model.show(req.params.id);
  res.json(product);
    } catch (err) {
    res.status(400);
    res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
  try {
    const p: product = {
      product_name: req.body.product_name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await model.create(p);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
};

export default productRoutes;
