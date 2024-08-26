import Producto from "../models/products.js";
import jwt from 'jsonwebtoken';
import redis from "../config/redis.js";


export const GetAllProducts = async (req, res) => {
    const productsKey = "products";

    let cachedResponse = await redis.get(productsKey);
    if (cachedResponse) {
      cachedResponse = JSON.parse(cachedResponse);
  
      return res.status(200).json(cachedResponse);
    }
    const productos = await Producto.findAll();
    await redis.set(productsKey, JSON.stringify(productos));
    res.json(productos);
};

export const GetOneProductById = async(req, res) => {
    const productos = await Producto.findOne({
      where: {
          id: req.params.id,
      }
      });
      res.json(productos);
};

export const CreateProduct = async (req, res) => {
    const productToCreate = req.body;

    await Producto.create(productToCreate);

    res.status(201).json(productToCreate);
};

export const UpdateProductById = async (req, res) => {
    await Producto.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
  
    const productUpdated = await Producto.findOne({
      where: {
          id: +req.params.id,
      },
  });
  
  console.log(productUpdated);
  
  res.json(productUpdated);
  };

  export const DeleteProductById = async (req, res) => {
    const ProductToDelete = await Producto.findOne({
        where: {
            id: +req.params.id,
        },
    });
  
    await Producto.destroy({
        where: {
            id: +req.params.id,
        },
    });
  
    res.json(ProductToDelete);
  };
//Autorizacion

  export const Login = async (req, res) => {
    const { productname, codigo } = req.body;

    const producto = await Producto.findOne({
        where: {
            productname: productname,
            codigo: codigo,
        },
    });

    if (!producto) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ productId: producto.id }, "backend", {
        expiresIn: 60 * 60,
    });

    res.json({ token: token });
};