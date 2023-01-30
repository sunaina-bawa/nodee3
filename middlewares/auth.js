const jwt = require("jsonwebtoken")

require("dotenv").config()

const auth = (req, res, next) => {
    if(!req.headers.auth){

        return res.send(" login again")
    }
    const token = req.headers.auth.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        
            if(err){
                res.send("Please login")
            }
            else{
                req.body.userId = decoded.userId
                next()
            }
        });
}

module.exports = {auth}