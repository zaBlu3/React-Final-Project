const {Router} = require("express");
const userServices = require("../services/UserServices");
const authRouter = Router();
const {
    validateUsername,
	validate,
    passwordVadlidation,
} = require("../MiddleWares/validator");






authRouter.post("/login",[passwordVadlidation(),validateUsername,validate],async ({user,...req},res) =>{
    const {username,password} = req.body
    const allUser = await userServices.authenticat(user,username,password)
    res.json(allUser);
  })

authRouter.post("/register",[passwordVadlidation(),validateUsername,validate],async (req,res) =>{
    const {password} = req.body
    const users = await userServices.register(req.user,password)
    res.json(users);
  })
  

  module.exports = authRouter