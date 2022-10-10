const arr = [2,4,53,5,,4,3,21,1,2,3,34,4,43];
for(let i=0 ; i<arr.lenght ; i++){
    console.log(arr[i] + " ")
    for(let j=arr.lenght ; j>0; j --){
        console.log(arr[j] + " ")
    }
}

// kyuki tum hi ho jindgi ab tum ho jain bhi mera dard bhi meri ashque ab tum hi ho jindgi ab tum hi ho chain bhi mera drd hi meri ashique ab tum hi ho 
const jwt = require('jsonwebtoken')
const util = require('util');
const jwtVerifyAsync = util.promisify(jwt.verify);

router.use(async (req, res, next) => {
  const token = getToken(req)
  try {
    req.auth = await jwtVerifyAsync(token, req.app.get('your-secret'))
  } catch (err) {
    throw new Error(err)
  }
  next()
});