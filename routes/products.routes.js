import { Router } from "express";
// //import checkIdNumber from "../middlewares/checkIdNumber.middleware";
// //import userExists from "../middlewares/userExists.middleware";
//import User from "../models/user.js";
import { CreateProduct, DeleteProductById, GetAllProducts, GetOneProductById, UpdateProductById } from "../controllers/products.controllers.js";


const productsRouter = Router();

productsRouter.get("/", GetAllProducts);

productsRouter.get("/:id", GetOneProductById);

productsRouter.post("/", CreateProduct);

productsRouter.patch("/:id",UpdateProductById );

productsRouter.delete("/:id", DeleteProductById);

export default productsRouter;