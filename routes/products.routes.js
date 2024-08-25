import { Router } from "express";
// //import checkIdNumber from "../middlewares/checkIdNumber.middleware";
// //import userExists from "../middlewares/userExists.middleware";
//import User from "../models/user.js";
import { CreateProduct, DeleteProductById, GetAllProducts, GetOneProductById, UpdateProductById } from "../controllers/products.controllers.js";
import checkIdNumber from "../middlewares/checkCodigoNumber.js";
import productExists from "../middlewares/productExists.js";
import { body, param } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";


const productsRouter = Router();

productsRouter.get("/", GetAllProducts);

productsRouter.get("/:id",[checkIdNumber,productExists], GetOneProductById);


productsRouter.post("/",     [
    body("productname", "productname not valid").exists().isString(),
    body("codigo", "codigo invalid").exists().isString().isLength({
        min: 1,
        max: 8,
    }),
    validateDataMiddleware,
],
CreateProduct);

productsRouter.patch("/:id",[checkIdNumber,productExists],UpdateProductById );

productsRouter.delete("/:id",[checkIdNumber,productExists], DeleteProductById);

export default productsRouter;