
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const maxAge = 3 * 24 * 60 * 60*1000;

const createToken = (email, password) => {
    return jwt.sign({email, password}, process.env.JWT_KEY, {
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

        res.cookie("jwt", createToken(email, password), {
            maxAge: maxAge,
            secure: true,
            sameSite    : "None",

        });

        return res.status(201).json({ user });



    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error" );
    }
};