const NotFoundMiddlware = (req,res)=>{
    res.status(404).send("route not exist")
}

module.exports = NotFoundMiddlware