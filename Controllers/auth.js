const login = async(req,res)=>{
    res.status(200).send("login");
}

const register = async(req,res)=>{
    res.status(200).send("register");
}

module.exports = {
    login,
    register
}