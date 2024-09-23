
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60*1000;

const createToken = (email, id) => {
    return jwt.sign({email, id}, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
}


export const signUp = async (req, res, next) => {

    try {
        const { email, password} = req.body;
        if(!email || !password) {
            return res.status(400).send( "Please provide an email and password");
        }
        //save the data in database
        const user = await User.create({ email, password });

        res.cookie("jwt", createToken(email, user.id), {
            maxAge: maxAge,
            secure: true,
            sameSite    : "None",

        });

        return res.status(201).json({ 
            user:{
                id:user.id,
                email: user.email,
                profileSetup: user.profileSetup,
               
            }
         });



    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error" );
    }
};


export const login = async (req, res, next) => {

    try {
        const { email, password} = req.body;
        if(!email || !password) {
            return res.status(400).send( "Please provide an email and password");
        }
       
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).send("User with given email is not found");
        }

        //compare from bcrypt 
        const auth = await compare(password, user.password);
        if(!auth){
            return res.status(400).send("password is incorrect");
        }
        

        res.cookie("jwt", createToken(email, user.id), {
            maxAge: maxAge,
            secure: true,
            sameSite    : "None",

        });

        return res.status(200).json({ 
            user :{
                id:user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
         });



    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error" );
    }
};

