const User  = require("../Models/User");
const register = async(req,res)=>{
    const user = await User.create({...req.body});
    const token = user.createToken();
    res.status(200).json({ user: { name: user.name }, token });
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!password||!email){
        res.send("please provide name and email");
    }
    const user = await User.findOne({email});
    if(!user){
        res.send("email not exsit");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        res.send("invaild password")
    }

    const token = user.createToken();
    res.status(200).json({user:{name:user.name},token})
}

module.exports = {
    login,
    register
}