
const express = require("express")
const {connect} = require("./config/db")
const {userInfo} = require("./routes/user")

const {auth} = require("./middlewares/auth")

const {postInfo} = require("./routes/post")

const app = express();


const PORT =  process.argv[2] || 2039;

app.use(express.json())

app.get("/", (req, res) => {

    res.send("Main page")
})

app.use("/user", userInfo)
app.use(auth)
app.use("/post",postInfo)


app.listen(PORT, async () => {



    try{
        await connect;
        console.log("Connected to database")
    }



    catch(err){
        console.log("Error")


        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})

