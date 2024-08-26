import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const User = dbConnection.define("Users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

User.sync();
export default User;