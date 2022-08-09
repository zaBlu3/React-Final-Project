const { param,body, validationResult } = require('express-validator')
const movieValidationBodyRules = () => {
  return [
    body("name","name is required").exists({checkFalsy:true}).bail().trim().isLength({min : 2}).withMessage("Name length should be atleast 2"),
    body("premiered","premiered date is required").exists({checkFalsy:true}).bail(),//valdiate before and after
    body("image","image link is required").exists({checkFalsy:true}).bail().trim().isURL({require_protocol:true}).withMessage("invalid URL format"),
    body("genres","genres is required").exists().bail().isArray().notEmpty().withMessage("gnres should be an array of strings").bail(),
    body("genres.*","objects inside should be a string with no numbers").if(body("genres").notEmpty()).isAlpha("en-US",{ignore:" -"})
  ]
}

const memberValidationBodyRules = () => {
  return [
    body("name","name is required").exists({checkFalsy:true}).bail().trim().isLength({max : 20}).withMessage("Name length should be atleast 20").matches(/^[a-zA-Z][a-z]{2,}\s+[A-Za-z][a-z]{2,}$/).withMessage("Only 2words,Capital availabe at start only, Length should be atleast 3 and only one space between (no numbers)"),
    body("email","email is required").exists({checkFalsy:true}).bail().trim().isEmail().withMessage("not valid email").normalizeEmail(),
    body("city","city is required").exists({checkFalsy:true}).bail().trim().isLength({min : 3 ,max : 20}).withMessage("Length between 2-20").matches(/(?=^.{0,40}$)^[A-Z][a-z]+[\s-]?([A-Z][a-z]+)?$/).withMessage("Mximum 2 words, Make sure its start with one capilat letter and atleast 2,  only one space/- between(no number)")
  ]
}

const idValidationRules = (callback) => {
  return [
    param('id')
    .isMongoId().withMessage("NOT VALID OBJECT ID").bail()
    .custom(async id => {
        if(!await callback(id))
            throw new Error ("no object with this id")
    })  
]
}







const validate = (req, res, next) => {
  

  const errors = validationResult(req)
  
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = {}
  errors.array().map(err => extractedErrors[err.param] =err.msg) //{...extractedErrors,[err.param] : err.msg})
  
  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  movieValidationBodyRules,
  idValidationRules,
  memberValidationBodyRules,
  validate,
}