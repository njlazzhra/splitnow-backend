import {validate} from "../validation/validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import * as bcrypt from "bcrypt";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
import {v4 as uuid} from "uuid";

const register = async (request)=>{
    const user = validate(registerUserValidation, request)

    const countUser= await prismaClient.users.count({
        where:{
            username: user.username
        }
    });

    if(countUser === 1){
        throw new ResponseError(400,"Username sudah terdaftar")
    }
    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.users.create({
        data: user,
        select : {
            username: true,
            name: true,
        }
    })
}

const login = async (request)=>{
    const loginRequest = validate(loginUserValidation, request)

    const user =await prismaClient.users.findUnique({
        where:{
            username: loginRequest.username,
        },
        select: {
            username:true,
            password: true
        }
    });

    if(!user){
        throw new ResponseError(401,"User does not exist");
    }

    const isPasswordCorrect= await bcrypt.compare(loginRequest.password, user.password)
    if(!isPasswordCorrect){
        throw new ResponseError(401,"Password incorrect")
    }

    const token = uuid().toString();
// kita update ke database untuk kasih token supaya dia punya akses
    return prismaClient.users.update({
        data :{
            token:token,
        },
        where:{
            username: user.username,
        },select : {
            token:true,
        }
    })

}

const getUser = async (username)=>{
    username = validate(getUserValidation, username)

    const user= await prismaClient.users.findUnique({
        where:{
            username: username,
        },
        select: {
            username:true,
            name: true,
        }
    })

    if(!user){
        throw new ResponseError(404,"User does not exist")

    }
    return user;
}

const updateUser = async (request)=>{
    const user = validate(updateUserValidation, request)

    const countUser= await prismaClient.users.count({
        where:{
            username: user.username
        }
    });

    if ( countUser !== 1){
        throw new ResponseError(404,"Username not found")
    }

    const data = {};
    if(user.name){
        data.name = user.name;
    }
    if(user.password){
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.users.update({
        where : {
            username: user.username
        },
        data: data,
        select : {
            username:true,
            name: true,
        }
    })

}

const logoutUser = async (username)=>{
    username = validate(getUserValidation, username)

    const user = await prismaClient.users.findUnique(
        {
            where:{
                username: username,
            }
        }
    );

    if(!user){
        throw new ResponseError(404,"User does not exist")
    }
    return prismaClient.users.update({
        where:{
            username: username,
        },
        data:{
            token: null,
        },
        select : {
            username:true,
        }
    })

}

export default {
    register,
    login,
    getUser,
    updateUser,
    logoutUser
}