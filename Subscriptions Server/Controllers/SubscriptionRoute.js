const {Router} = require("express");
const subService = require("../services/SubscriptionServices")
const {
	memberValidationBodyRules,
	idValidationRules,
	validate,
} = require("../MiddleWares/validator");
const subRouter = Router();


subRouter.route("/:id*").get([idValidationRules(subService.subscriptionExists), validate]);
subRouter.route("/:id").delete([idValidationRules(subService.subscriptionExists), validate]);
subRouter.route("/").post([memberValidationBodyRules(), validate]);
subRouter.route("/:id*").patch([idValidationRules(subService.subscriptionExists), validate]);
subRouter.patch("/:id", [memberValidationBodyRules(), validate]);



subRouter.patch("/:id/addmovie",async (req,res) =>{//add movie to member
    const {id} = req.params
    const user = await subService.addMovieToSubscription(id,req.body.movieId,req.body.date)
   res.json(user);
})



//getall
subRouter.get("/",async (req,res) =>{
    const users = await subService.getAllSubscriptions()
    res.json(users);
})



subRouter.get("/:id/available",async (req,res) =>{
    const {id} = req.params
    const movies = await subService.moviesAvailable(id);
    res.send(movies)
    
})

//getbyid
subRouter.get("/:id",async (req,res) =>{
    const {id} = req.params
    const member = await subService.getMemberBySubsriptionId(id)
    res.json(member);
})


//delete
subRouter.delete("/:id",async (req,res) =>{
    const {id} = req.params
    await subService.deleteSubscription(id)
	res.json("Deleted successfuly");
})


//update
subRouter.patch("/:id",async (req,res) =>{
    const {id} = req.params
    const member = await subService.updateSubscriptionMember(id,req.body)
    res.json(member);
})


//creat
subRouter.post("/",async (req,res) =>{
    const sub = await subService.createSubscription(req.body)
   res.json(sub);
})








module.exports = subRouter;
