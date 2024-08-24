import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const User = dbConnection.define("Users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },

});

//await User.sync();
User.sync();
export default User;
