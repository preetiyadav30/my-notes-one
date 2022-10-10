// register api for user with token authentication
router.post('/register', function(req, res) {
  //here we are hashing the password 
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token using jwt.sign() , in payload we add for now only id
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });
// get api for geting back the token from the user when user come 2nd time and verify the token 
// this token is verifyed or not 
  router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];  // default name of token is - "x-access-token"
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' }); // if token is not provide 
    // and if token is provide then jwt.verify() method is called and this method will verify the token
    // coming with request in header if token is verify then res = 200 if not then invalid authentication
    //jwt.verify method decodes the token making it possible to view the original payload.
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      //We’ll handle errors if there are any and if there are not, send back the decoded value as the response.
      res.status(200).send(decoded);
    });
  });