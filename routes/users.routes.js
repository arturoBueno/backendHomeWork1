import { Router } from "express";
// //import checkIdNumber from "../middlewares/checkIdNumber.middleware";
// //import userExists from "../middlewares/userExists.middleware";
import User from "../models/user.js";
import { CreateUser, DeleteUserById, GetAllUsers, GetOneUserById, UpdateUserById } from "../controllers/users.controllers.js";


const usersRouter = Router();

usersRouter.get("/", GetAllUsers);

usersRouter.get("/:id", GetOneUserById);

usersRouter.post("/", CreateUser);

usersRouter.patch("/:id",UpdateUserById );

usersRouter.delete("/:id", DeleteUserById);

export default usersRouter;