
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";
import { renameSync, unlinkSync } from "fs";


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



export const getUserInfo = async (req, res, next) => {

    try {
       const userData = await User.findById(req.userId);

       if(!userData){
        return res.status(404).send("User not found");
    }
        return res.status(200).json({ 
       
            id:userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
          
       
            });

            }catch (error) {
                console.log({error});
                return res.status(500).send("Internal Server Error" );
                }
     };



     export const updateProfile = async (req, res, next) => {

        try {
           const {firstName, lastName, color} = req.body;
           if(!firstName || !lastName) {
            return res.status(400).send( "Please provide all the fields");
           }
           const userData = await User.findByIdAndUpdate(req.userId, {firstName, lastName, color, profileSetup:true, }, {new: true,runValidators: true});
           if(!userData){
            return res.status(404).send("User not found");
         }
            return res.status(200).json({ 
           
                id:userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
              
           
                });
    
                }catch (error) {
                    console.log({error});
                    return res.status(500).send("Internal Server Error" );
                    }
         };



export const addProfileImage = async (req, res, next) => {
    try {

        if(!req.file){
            return res.status(400).send("Please provide an image");
        }

        const date =  Date.now();
        let fileName = "uploads/profile/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);
        const userData = await User.findByIdAndUpdate(req.userId, {image: fileName}, {new: true,runValidators: true});
        if(!userData){
            return res.status(404).send("User not found");
        }
        return res.status(200).json({
            image:userData.image,
        });


         }catch (error) {
            console.log({error});
            return res.status(500).send("Internal Server Error" );
        }
    };


export const removeProfileImage = async (req, res, next) => {
    const {userId} = req;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).send("User not found");
        }

        if(user.image){
           unlinkSync(user.image);
        }
        user.image = null;
        await user.save();
        return res.status(200).send("Profile image removed successfully");
        } catch (error) {
            console.log({error});
            return res.status(500).send("Internal Server Error" );
        }

}