import userService from "../service/googleAuth-service.js";
import {prismaClient} from "../application/database.js";
import {v4 as uuid} from "uuid";

const googleAuthRedirect = (req, res, next) => {
    try {
        const redirect_uri = 'http://localhost:3000/auth/google/callback'
        const client_id = process.env.GOOGLE_CLIENT_ID
        const scope = encodeURIComponent('email profile')

        const authURL = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `response_type=code&` +
            `client_id=${client_id}&` +
            `redirect_uri=${redirect_uri}&` +
            `scope=${scope}&` +
            `access_type=offline`


        res.redirect(authURL)
    }catch (e) {
        next(e)
    }
}

const googleAuthCallback = async (req, res, next) => {
    try {
        const code = req.query.code
        const userData = await userService.handleGoogleCallback(code)
        const { email, name, picture } = userData

        //cek di database
        let user = await prismaClient.users.findMany({
            where: {
                username: email,
            }
        })

        if (!user){
            const token = uuid().toString()
            //kalo dia user gada maka kita insert ka database
             await prismaClient.users.create({
                data: {
                    username : email,
                    name : name,
                    token : token,
                    picture : picture // ini kalo ada dan kita harus tanya dulu

                }
            })
        }
        res.redirect('http://localhost:5173/dashboard/splitnow') // redirect ke url front end kita
    } catch (e) {
        next(e);
    }
}

export default {
    googleAuthRedirect,
    googleAuthCallback

}