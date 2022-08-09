const { Router } = require("express");
const movieServices = require("../services/MovieServices");
const subService = require("../services/SubscriptionServices");
const {
	movieValidationBodyRules,
	idValidationRules,
	validate,
} = require("../MiddleWares/validator");
const movieRouter = Router();






//adding validation middlware to all routes that need it
movieRouter.route("/:id*").all([idValidationRules(movieServices.movieExists), validate]);
movieRouter.stack[0].route.methods = {delete:true,patch:true,get:true}//removing the post method for the /:id route
movieRouter.post("/", [movieValidationBodyRules(), validate]);
movieRouter.patch("/:id", [movieValidationBodyRules(), validate]);

//getall
movieRouter.get("/", async (req, res) => {
	const movies = await subService.getAllMoviesWithSubscriptions(); //return all movies with thier subs
	res.json(movies);
});
//post
movieRouter.post("/", async (req, res) => {
	const movie = await movieServices.creatMovie(req.body);
	res.json({ ...movie, subscriptions: [] });//adding subs as empty array
});

//getbyid
movieRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const user = await movieServices.getMovie(id);
	res.json(user);
});

//get subs based of movie id - not used for now
movieRouter.get("/:id/subscriptions", async (req, res) => {
	const { id } = req.params;
	const subs = await subService.getMovieSubscriptions(id); // get all movies subscriptions
	res.json(subs);
});



//delete
movieRouter.delete("/:id", async (req, res) => { // check what happens if fail to delete
	const { id } = req.params;
	const movie = await movieServices.deleteMovie(id);
    try {// delete all sub that have this id
        await subService.deleteMovieSubscriptions(id); 
    } catch (error) { // if deleteing subs fails creat the movie again
       await movieServices.creatMovie({...movie,_id:id})
       throw new Error("Something failed, Couldn`t delete Movie")
    }
	res.json("Deleted successfuly");
});

//update
movieRouter.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const subscriptions = req.body.subscriptions;//saveing the subs array from the front end
	const movie = await movieServices.updateMovie(id, req.body);
	res.json({ ...movie, subscriptions });//sending back the subs to the clint
});

module.exports = movieRouter;
