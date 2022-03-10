import {Model, DataTypes} from "sequelize";
import sequelize from "../connect"

class User extends Model{}
User.init({

    fname:{
        type:DataTypes.STRING,
		allowNull:false
    },
    lname:{
        type:DataTypes.STRING,
		allowNull:false
    },
	account:{
		type:DataTypes.STRING,
		allowNull:false
		
	},
	tel:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true
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
	actor:{
		type: DataTypes.STRING,
		defaultValue:'1'

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
