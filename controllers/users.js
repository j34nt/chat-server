const { response } = require("express");
const User = require('../models/user');


const getUsers = async (req, res = response) => {
    const from = Number(req.query.from) || 0;

    try {
        const users = await User
            .find({_id:{$ne:req.uid}})
            .sort('-online')
            .skip(from)
            .limit(20)

        res.json({
            ok:true,
            users,
            from
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte al Admin'
        })
    }


}

module.exports = {
    getUsers
}