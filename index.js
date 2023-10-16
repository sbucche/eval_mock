const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//require("dotenv").config();
const cors = require("cors")
const {Usermodel} = require("./models/User.model");
const { connection } = require("./config/db");
const {empRouter} = require("./routes/emp.routes")
const {Authenticate} = require("./middleware/Authenticate")

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("this base url")
})


app.post("/signup", async(req,res)=>{
    const {email, password , confirm_password} = req.body;
    try{
        bcrypt.hash(password, 4,async function(err, hash) {
                await Usermodel.create({email, password: hash, confirm_password:hash}) 
                res.send({message: "user Create Successfully"})
       });
    }
    catch(err)
    {
         console.log(err)

    }
})

app.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    const user = await Usermodel.findOne({email});
    if(!user)
    {
        return res.send({message: "user does not exist , please signup"});
    }
    const hash = user?.password;

    bcrypt.compare(password, hash, function(err, result) {
        // result == true
        if(result)
        {
            var token = jwt.sign({ UserID: user._id }, 'screte');
            res.send({message:"Login Successful" , token: token})
        }
        else
        {
            res.send({message:"Invalid Credentials"})
        }
    });
})


app.use(Authenticate);
app.use("/employees" ,empRouter)



app.listen(8080, async()=>{
     try {
          await connection;
          console.log("connected")
     } 
     catch (error) {
          console.log(error)
     }

     console.log("connected to 8080")
})