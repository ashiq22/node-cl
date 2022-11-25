const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_SECRET  = config.get("jwtSecret");

 function auth(req, res, next){
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ msg: 'no token, unable to authenticate' });

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.user = decodedData; //get data from the token
    next();
  } catch (e) {
    res.status(401).json({ msg: 'invaild token' });
  }
}
module.exports = auth;
