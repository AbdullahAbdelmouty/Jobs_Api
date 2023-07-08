const User  = require("../Models/User");
const register = async(req,res)=>{
    const user = await User.create({...req.body});
    res.status(200).json({user});
}

const login = async(req,res)=>{
    res.status(200).send("register");
}

module.exports = {
    login,
    register
}