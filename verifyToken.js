const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('Authorization');
    if(!token){
        res.send("No  token found...!!");
    }
    try{
        // console.log(token.split(' ')[1]);
        jwt.verify(token,"privatekey");
        next();
    }catch(error){
        res.send("Invalid token...!!");
    }
}