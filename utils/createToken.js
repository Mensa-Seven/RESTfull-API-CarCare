import jwt from "jsonwebtoken"

const JWT_SECRET = "hfjkahfjkasdhfjkdsfdsakljdla"

export const createToken = (sub) => {
	const token = jwt.sign(sub, JWT_SECRET, {expiresIn: "7d"})

    return token
}

//ฟังก์ชันนี้ทำการ ถอดรหัส token ที่รับมาลเเล้ว ส่งค่ากลับ 
export const verifyToken = (token) => {
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log(`VerfifyToken Function ${decoded}`);
    return decoded
}