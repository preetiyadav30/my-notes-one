const jwt  = require('jsonwebtoken')
const config = require('../../config/default')

function verifyjwt(req,res,next){
    const token = req.headers['authorization']
    if(!token) return res.status(401).json('Unauthorize user')

   try{
        const decoded = jwt.verify(token,config.secret);
        req.user = decoded
        next()

   }catch(e){
    res.status(400).json('Token not valid')
   }
}

module.exports = verifyjwt

const CONST = require('../../config')
exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send('invalid request'); //invalid request
            } else {
                req.jwt = jwt.verify(authorization[1], CONST.SECRET);
                return next();
            }
        } catch (err) {
            return res.status(403).send(); //invalid token
        }
    } else {
        return res.status(401).send('invalid request');
    }
}