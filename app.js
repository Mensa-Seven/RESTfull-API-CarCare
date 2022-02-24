import express from "express";
import cors from "cors";
import User from "./database/model/User";
import bcrypt from "bcryptjs"
import { createToken } from "./utils/createToken";

const app = express()
app.use(cors())
app.use(express.json())




app.post('/register', async(req, res) => {
    const { body } = req

	try {
		const user = await User.create({
            fname:body.fname,
            lname:body.lname,
			email: body.email,
			password: bcrypt.hashSync(body.password),
			tokenVersion: 1,
		})

		const userJson = user.toJSON()
		delete userJson.password

		res.send({ user: userJson })
	} catch (error) {
		console.log(error)
		res.status(500).send({ error })
	}

})

app.post("/login", async (req, res) => {
	const { body } = req

    // ค้นหาข้อมูล email 
	const user = await User.findOne({
		where: {
			email: body.email,
		},
	})

	if (!user) {
		return res.sendStatus(401)
	}

    //เช็ค password 
	if (!bcrypt.compareSync(body.password, user.password)) {
		return res.sendStatus(401)
	}

	const userJson = user.toJSON()

	delete userJson.password

	const token = createToken({ sub: user.id, v: user.tokenVersion })

	res.send({
		user: userJson,
		token,
	})
})



export default app