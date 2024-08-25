import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productsRouter from "./routes/products.routes.js";
import { dbConnection } from "./config/db.js";
import RateLimit from "./middlewares/rateLimit/rateLimits.middleware.js";

const app=express();

app.use(cors());
app.use(bodyParser());
app.use(RateLimit);

app.use("/products", productsRouter);

try {
    dbConnection.authenticate();
    console.log("Connected to DB");
} catch (error) {
    console.log(error);
}

app.listen(8080,()=>{
    console.log("Server running on http://localhost:8080");

});