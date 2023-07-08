const User  = require("../Models/User");
const{BadRequestError,UnauthorizedError,NotFoundError} = require('../Errors')
const register = async(req,res)=>{
    const user = await User.create({...req.body});
    const token = user.createToken();
    res.status(200).json({ user: { name: user.name }, token });
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!password||!email){
        throw new BadRequestError("please provide name and email");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new UnauthorizedError("Invalid Credentials") ;
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthorizedError("Invalid Credentials") ;
    }

    const token = user.createToken();
    res.status(200).json({user:{name:user.name},token})
}

module.exports = {
    login,
    register
}