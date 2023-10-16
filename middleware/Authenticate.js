var jwt = require("jsonwebtoken")


const Authenticate = (req, res , next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    jwt.verify(token, 'screte', function(err, decoded) {
        //console.log(decoded.foo) // bar

         if(err)
         {
            return res.send({message : "Please login first"})
         }
         console.log(decoded);
         req.UserID = decoded.UserID;
         next();

    });
}


module.exports = {Authenticate}