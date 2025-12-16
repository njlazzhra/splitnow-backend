import {prismaClient} from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get("Authorization")

    if (!token) {
        return res.status(401).json({
            error: "Unauthorized"
        }).end()
    }
    
    const user = await prismaClient.users.findFirst({
        where: {
            token: token
        }
    })
    if(!user){
        return res.status(401).json({
            error: "Unauthorized"
        }).end()
    }
    
    req.user = user;
    next();
}