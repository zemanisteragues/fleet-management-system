const jwt = require('jsonwebtoken');


const fetchUsers = (req,res,next)=>{
    const token = req.header('auth-toke');
    if(!token) {
        res.status(401).send('please authenticate yourself')
    }
    else {
        const data = jwt.verify(token,'vinu')
        req.user = data.user
        next();
    }   
}

module.exports = fetchUsers;