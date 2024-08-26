import { Router } from "express";
import checkIdNumber from "../middlewares/users/checkIdNumber.middleware.js";
import userExists from "../middlewares/users/userExists.middleware.js";

import {
    CreateUser,
    DeleteUserById,
    GetAllUsers,
    GetOneUserById,
    Login,
    UpdateUserById,
} from "../controllers/users.controller.js";
import authorizateUser from "../middlewares/users/authorizateUser.middleware.js";
import { body, param } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";

const usersRouter = Router();

usersRouter.get("/", GetAllUsers);

usersRouter.get("/:id", [checkIdNumber, userExists], GetOneUserById);

// GET => app.com/users/login/luis/123
// POST { username: LUIS, password: 123} => app.com/users/login
usersRouter.post("/login", Login);

// GET => app.com/users
// POST {name:"Luis"} => app.com/users

usersRouter.post(
    "/",
    [
        body("username", "Username not valid").exists().isString(),
        body("password", "Password invalid").exists().isString().isLength({
            min: 1,
            max: 10,
        }),
        validateDataMiddleware,
    ],
    CreateUser
);

// PATCH { name: "Juan" } => app.com/user/3
usersRouter.patch("/:id", [checkIdNumber, userExists], UpdateUserById);

usersRouter.delete(
    "/:id",
    [checkIdNumber, userExists, authorizateUser],
    DeleteUserById
);

export default usersRouter;