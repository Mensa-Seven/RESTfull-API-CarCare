import {Model, DataTypes} from "sequelize";
import sequelize from "../connect"

class User extends Model{}
User.init({
    fname:{
        type:DataTypes.STRING
    },
    lname:{
        type:DataTypes.STRING
    },
    email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	tokenVersion: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	resetPasswordCode: {
		type: DataTypes.INTEGER,
	},
	resetCodeExpiredIn: {
		type: DataTypes.BIGINT,
	}
},
{
    sequelize, modelName: 'user'
})
export default User
