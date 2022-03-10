import User from "../database/model/User"
import { verifyToken  } from "../utils/createToken"


const auth = async(req, res ,next) => {
    if(!req.headers.authorization){
        return res.status(401)
    }
    const [bearer, token] = req.headers.authorization.split(" ")
    try{

        const decoded = verifyToken(token)
        console.log(`decoded function auth ${decoded.sub}`);
        console.log(decoded);
        const user = await User.findByPk(decoded.sub)
        
        if(decoded.v !== user.tokenVersion){
            return res.status(401)
        }

        req.user = user.toJSON()
        
        next()


    }catch(e){
        res.send({message:"UnEceptToken"})
    }

}

export default auth