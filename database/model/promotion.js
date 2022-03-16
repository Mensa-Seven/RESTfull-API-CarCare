import {Model, DataTypes} from "sequelize";
import sequelize from "../connect"

class Promotion extends Model{}
Promotion.init({

    title:{
        type:DataTypes.STRING,
		allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        defaultValue:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPbgWwFKdbsl8H5E7d2-cJ7DQ8KeMxIrIuYw&usqp=CAU"
    },  
    Description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.STRING,
        allowNull:false
    },
    to:{
        type:DataTypes.STRING,
        allowNull:false
    },
    end:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    sequelize, modelName: 'promotion'
})
export default Promotion
