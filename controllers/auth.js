const { response } = require("express");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { generatJWT } = require("../helpers/jwt");


const createUser = async (req, res = response) => {

    const {email, password} = req.body;
    try {
        const emailExist = await User.findOne({email});
        if(emailExist) {
            return res.status(400).json({
                ok:false,
                msg:'Email is already registered'
            })
        }
        const user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate JWT
        const token = await generatJWT(user.id);

        res.json({
            ok:true,
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte al Admin'
        })
    }
    
}
const loginUser = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        const userDB = await User.findOne({email});
        if(!userDB) {
            return res.status(400).json({
                ok:false,
                msg:'User do not exist'
            })            
        } 
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'Password not valid'
            })
        }
        //Generate JWT
        const token = await generatJWT(userDB.id);
        res.json({
            ok:true,
            user: userDB,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contact Admin'
        })
    }
}

const renewToken = async(req, res = response) => {

    //TODO uid user
    const uid = req.uid;
    console.log(uid);
    //Generate new JWT
    const token = await generatJWT(uid);
    //get user by uid - findById

    try {
        const user = await User.findById(uid);
        res.json({
            ok:true,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Contact Admin'
        })
        
    }

}

module.exports = {
    createUser,
    loginUser,
    renewToken
}