import app from "./app";
import sequelize from "./database/connect";
import dotenv from "dotenv"
dotenv.config()



const serverRun = async() => {
	await sequelize.sync({ force: false })
    app.listen(process.env.PORT, "0.0.0.0", () => {
        console.log(`🚀 Server is running on 0.0.0.0:${process.env.PORT}`)
    })
    
}

serverRun()