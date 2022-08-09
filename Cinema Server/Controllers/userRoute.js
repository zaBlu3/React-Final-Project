const {Router} = require("express");
const userServices = require("../services/UserServices");
const userRouter = Router();
const {validate,userValidation,idValidation} = require("../MiddleWares/validator");



userRouter.route("/:id").all([idValidation(), validate]);
userRouter.stack[0].route.methods = {delete:true,patch:true,get:true}//removing the post method for the /:id route
userRouter.route("/id").patch([userValidation(), validate])
userRouter.route("/").post([userValidation(), validate])


//getall
userRouter.get("/",async (req,res) =>{
    const users = await userServices.getAllData()
    res.json(users);
})





//getbyid
userRouter.get("/:id",async (req,res) =>{
    const {id} = req.params
    const user = await userServices.GetDataById(id)
    res.json(user);
})


//delete
userRouter.delete("/:id",async (req,res) =>{
    const {id} = req.params
    const user = await userServices.deleteData(id)
    res.json("delted");
})


//update
userRouter.patch("/:id",async (req,res) =>{
    const {id} = req.params
    const user = await userServices.updateData(id,req.body)
    res.json(user);
})


//creat
userRouter.post("/",async (req,res) =>{
    const user = await userServices.addData(req.body)
    console.log(user);
   res.json(user);
})



module.exports = userRouter;
