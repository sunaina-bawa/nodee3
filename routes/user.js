const {Router} = require("express")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")


require("dotenv").config()


const {UserModel} = require("../models/user")

const userInfo = Router();

userInfo.post("/signup", (req, res) => {
    const {name,email,gender, password} = req.body;

    bcrypt.hash(password, 4, async function(err, hash) {
        if(err){
            res.send("Something went wrong")
        }
        const user = new UserModel({
            name,
            email,
            gender,
            password : hash,
            
        })
        try{
            await user.save()
            res.json({msg : "Signup Successfull"})
        }
        catch(err){
            console.log(err)
            res.send("Something went wrong")
        }
       
    });
})




userInfo.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email})

    const userpassword = user.password

    bcrypt.compare(password, userpassword, function(err, result) {


        if(err){


            res.send("Something went wrong")
        }





        if(result){
            const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET);
            res.json({message : "Login Successfull", token})
        }



        else{
            res.send("Invalid Info")
        }
    });
    
})

module.exports = {
    userInfo
}