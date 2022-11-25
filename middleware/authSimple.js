 function authSimple(req, res, next){
  const token = req.header('Authorization');

  if (!token)
    return res.status(401).json({ msg: 'no token, unable to authenticate' });
  else{
	  if(token == "Bearer 3100project")
		  next();
	  else
		  res.status(401).json({ msg: 'invaild token' });
  }
}
module.exports = authSimple;
