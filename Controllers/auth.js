const User  = require("../Models/User");
const login = async(req,res)=>{
    const user = await User.create({...req.body});
    res.status(200).json({user});
}

const register = async(req,res)=>{
    res.status(200).send("register");
}

module.exports = {
    login,
    register
}