import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config()

const sequelize = new Sequelize({
    host: "localhost",
    port:process.env.PORTDB,
	username:process.env.USERNAME,
	password:process.env.PASSWORD,
	database: process.env.DATABASE,
	dialect: "mysql",
	logging: true,
	}
)


export default sequelize