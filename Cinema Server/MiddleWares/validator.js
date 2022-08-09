const { param, body, validationResult } = require('express-validator')
const userMongo = require("../DL/UsersMongoDL");



const userValidation = () => {
  return [
    body("firstname","Fist name is required").exists({checkFalsy:true}).bail().trim().isLength({min: 3 , max : 10}).withMessage("Name length should be between 3-10").isAlpha().withMessage("Only letter allowed"),
    body("lastname","Last name is required").exists({checkFalsy:true}).bail().trim().isLength({min: 3 , max : 10}).withMessage("Name length should be between 3-10").isAlpha().withMessage("Only letter allowed"),
    body("permissions","permissions is required").exists().bail().isArray().notEmpty().withMessage("Atleast one Permission is required").bail(),
    body("username","Username is required").exists({checkFalsy:true}).bail().trim().isLength({min : 4 ,max : 10}).withMessage("Length between 4-10").isAlphanumeric().withMessage("Only letters and numbers allowed").custom(async username => {
      if(await userMongo.getUserName({username})) throw new Error("Username already in use")
    }),
    body("password","password shouldnt be set on creation").not().exists()

  ]
}



const idValidation =() => {
  return [
    param('id')
    .isMongoId().withMessage("NOT VALID OBJECT ID").bail()
    .custom(async id => {
        if(!await userMongo.getUser(id))
            throw new Error ("no object with this id")
    })  
]
}

const passwordVadlidation = () => {
  return [
    body("password","password is required").exists({checkFalsy:true}).bail().matches(/^\S+$/).withMessage("no spaces allowed").bail().isStrongPassword({minSymbols : 0}).withMessage("Password doesn`t match requirments")]
} 

const validateUsername =  async (req, res, next) =>{
  const { username } = req.body;
  const user = await userMongo.getUserName({username}) 
  if (!user) req.error = { username : "username doesn't exist"};
  else req.user = user
  next()
      
 
  }


const validate = (req, res, next) => {

  const errors =  req.error ?? validationResult(req).formatWith(({msg})=> msg).mapped()
  if (!Object.keys(errors).length) {
    return next()
  }
   return res.status(422).json({errors})
}

module.exports = {
  idValidation,
  userValidation,
  validate,
  passwordVadlidation,
  validateUsername
}