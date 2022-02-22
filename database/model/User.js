import {Model, DataTypes} from "sequelize";
import sequelize from "../connect"

class User extends Model{}
User.init({
    username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
        unique:false
	},
    fname:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    lname:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    actor:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},
{
    sequelize, modelName: 'user'
})
export default User
