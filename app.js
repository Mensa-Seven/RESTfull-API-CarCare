import express from "express";
import cors from "cors";
import User from "./database/model/User";
import Promotion from "./database/model/promotion";

import bcrypt from "bcryptjs"
import { createToken } from "./utils/createToken";

import  auth  from "./middleware/auth"
import res, { send } from "express/lib/response";
import { where } from "sequelize/dist";

const app = express()
app.use(cors())
app.use(express.json())

app.patch('/promotion', async(req, res) => {
	try{
		if(req.body.title){
			await Promotion.update(
				{
					title:req.body.title
				},
				{
					where:{
						id:req.body.id
					}
				}
			)
		}
		if(req.body.Description){
			await Promotion.update(
				{
					Description:req.body.Description
				},
				{
					where:{
						id:req.body.id
					}
				}
			)
		}
		if(req.body.price){
			await Promotion.update(
				{
					price:req.body.price
				},
				{
					where:{
						id:req.body.id
					}
				}
			)
		}
		if(req.body.to){
			await Promotion.update(
				{
					to:req.body.to
				},
				{
					where:{
						id:req.body.id
					}
				}
			)
		}
		if(req.body.end){
			await Promotion.update(
				{
					end:req.body.end
				},
				{
					where:{
						id:req.body.id
					}
				}
			)
		}
		


		res.send({message:"updated"})

	}catch(error){
		return res.send({message:"error"})
	}
})

app.post('/promotion', async(req, res) => {
	try{
		console.log(req.body);
		const promotion = await Promotion.create(req.body)
		res.send({message:"OK"})
	}catch(error){
		res.send({message:"ไม่สามารถเพิ่มโปรโมชันได้"})
		console.log("เกิดข้อผิดพลาด");
	}
	
})

app.delete('/promotion', async(req, res) => {
	try{
		console.log(req.body.id);
		await Promotion.destroy({
			where:{
				id:req.body.id
			}
		})
		res.send({message:"success"})

	}catch(error){
		return res.send({message:"error"})
	}
})
app.patch('/promotion', async(req, res) => {
	try{
		await Promotion.update({
			
		})

	}catch(error){

	}
})



// get all promotion
app.get('/promotion', async(req, res) => {
	const pro = await Promotion.findAll()
	res.json(pro)

})

//สมัครสมาชิก
app.post('/register', async(req, res) => {
    const { body } = req

	try {
		const t = await User.findOne({
			where:{
				email:body.email
			}
		})
		if(t) return res.send({message:"อีเมลนี้ถูกใช้งานเเล้ว"})

		const user = await User.create({
            fname:body.fname,
            lname:body.lname,
			account:body.account,
			tel:body.tel,
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

/// Endpoint loguot

app.delete('/logout' , auth, async(req, res) => {
	console.log('log');
	//ค้นหาด้วย primarykey
	console.log(req.body);
	const user = await User.findByPk(
		req.user.id
	)
	/// เปลี่ยน version ของ token
	user.tokenVersion +=1
	await user.save()
	res.send({
		status:"sucess"
	})

})

//me or profile

app.get('/profile', auth, async ( req, res) => {
	const {body} = req.body 
	try{

		const user = await User.findByPk(req.user.id)
		const userJson = user.toJSON()
		delete userJson.password
		res.send(userJson)


	}catch(e){
		res.send(e)
	}
})




app.patch('/profile', auth, async(req, res) => {
	try{
		if(req.body.fname){

			try{
				const user = await User.findByPk(req.user.id)
				if(!user) return res.status(400).json({ message:"not found user"})

				const updateUser = await User.update(
					{
						fname:req.body.fname
					},
					{
						where:{
							id:user.id
						}
					}
				)

			}catch(e){
				console.log(e);
			}
		}
		if(req.body.lname){
			try{
				const user = await User.findByPk(req.user.id)
				if(!user) return res.status(400).json({ message:"not found user"} )

				const updateUser = await User.update(
					{
						lname:req.body.lname
					},
					{
						where:{
							id:user.id
						}
					}
				)

			}catch(e){
				console.log(e);
			}
		}
		
		if(req.body.account){

			try{
				const user = await User.findByPk(req.user.id)
				if(!user) return res.status(400).json({ message:"not found user"})

				const updateUser = await User.update(
					{
						account:req.body.account
					},
					{
						where:{
							id:user.id
						}
					}
				)

			}catch(e){
				console.log(e);
			}
		}


		if(req.body.a){
			try{
				const user = await User.findByPk(req.user.id)
				if(!user) return res.status(400).json({ message:"not found user"})

				const updateUser = await User.update(
					{
						tel:req.body.tel
					},
					{
						where:{
							id:user.id
						}
					}
				)

			}catch(e){
				console.log(e);
			}
		}


	res.status(200).json({
		message:"sucess"
	})

	}catch(e){
		return res.status({message:"can't update profile"})
	}


})

// updatea fname
app.patch('/profile/fname', auth, async(req, res) => {
	console.log('profile patch');
	const {body} = req.body
	try{

		const user = await User.findByPk(req.user.id)
		if(!user) return res.status(400).json({ message:"not found user"})

		const updateUser = await User.update(
			{
				fname:req.body.fname
			},
			{
				where:{
					id:user.id
				}
			}
		)
		
		res.status(200).json({ message:"update sucess fname"})


	}catch(error){
		res.status(500).json({ error })
	}


})

//update lname
app.patch('/profile/lname', auth, async(req, res) => {
	console.log('profile patch');
	const {body} = req.body
	try{

		const user = await User.findByPk(req.user.id)
		if(!user) return res.status(400).json({ message:"not found user"})

		const updateUser = await User.update(
			{
				lname:req.body.lname
			},
			{
				where:{
					id:user.id
				}
			}
		)
		
		res.status(200).json({ message:"update sucess lname"})


	}catch(error){
		res.status(500).json({ error })
	}


})
//update account

app.patch('/profile/account', auth, async(req, res) => {
	console.log('profile patch');
	const {body} = req.body
	try{

		const user = await User.findByPk(req.user.id)
		if(!user) return res.status(400).json({ message:"not found user"})

		const updateUser = await User.update(
			{
				account:req.body.account
			},
			{
				where:{
					id:user.id
				}
			}
		)
		res.status(200).json({ message:"update sucess account"})


	}catch(error){
		res.status(500).json({ error })
	}


})


app.patch('/profile/tel', auth, async(req, res) => {
	console.log('profile patch');
	const {body} = req.body
	try{

		const user = await User.findByPk(req.user.id)
		if(!user) return res.status(400).json({ message:"not found user"})

		const updateUser = await User.update(
			{
				tel:req.body.tel
			},
			{
				where:{
					id:user.id
				}
			}
		)
		res.status(200).json({ message:"update sucess tel"})


	}catch(error){
		res.status(500).json({ error })
	}


})



export default app