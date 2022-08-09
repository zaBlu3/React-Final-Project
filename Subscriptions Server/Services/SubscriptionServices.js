const Subscription = require("../Models/SubscriptionsModel");
const movieServices = require("../services/MovieServices");
const memberService = require("../services/MemberServices");
const axios = require("axios");
const url = "https://jsonplaceholder.typicode.com/users";

async function initialize () {
	try {
		if (!await Subscription.count({})) {
			const { data } = await axios.get(url);
			data.forEach(async ({address : {city},...member}) => await createSubscription({city,...member}));
		}
	} catch ({ message }) {
		console.log(message);
	}
};








//get single movie subs
const getMovieSubscriptions = async (id) =>{
	//return 
	
	let members = await Subscription.find({}).where("movies.movieId").equals(id).populate("memberId",["name"]).select("movies.$ -_id")
	//let members = await Subscription.find({}).where("movies.movieId").equals(id).populate("memberId")
	//let movies = await Subscription.aggregate([{ "$unwind" : "$movies" }]).sort("memberId")
	//movies = movies.filter(({movies : {movieId}}) => movieId == id).map(({memberId,movies : {date}} )=> ({[memberId] :date}))
	members = members.map(({memberId:{name,_id},movies}) => ({name,_id, date : movies[0].date}))
	return members;

}

//get all movies with thier subs
const getAllMoviesWithSubscriptions = async () =>{
	const movies = await movieServices.getAllMovies()
	 return await Promise.all(movies.map(async (movies)=>{
        const subs = await getMovieSubscriptions(movies._id)// get all movies subscriptions
        return {...movies,subscriptions : [...subs]}
    }))
   

}

//delete movie subs
const deleteMovieSubscriptions =  (id) => {
	
	//let members = 
	return Subscription.updateMany(
		{},
		{ $pull: { movies: { movieId: id } } },
  { multi: true}
	)
	
	
}

//add movie to subs
const addMovieToSubscription = async (subId,movieId,date) => {
	if(await Subscription.alreadySubscribed(subId,movieId))	throw new Error("already subscribed to this movie")
	  const newSub = await Subscription.findByIdAndUpdate(
		subId,
		{ $push: { movies: { movieId, date } }},
		{new: true}
	).populate(["memberId",{path : "movies.movieId", select : "name"}])
	return newSub
	 
}





//get mall movies availabe for sub
const moviesAvailable = async (id)=> {
	let {movies} = await Subscription.findById(id).populate({path : "movies.movieId", select : "name"}).select("movies.movieId")
	movies = movies.map(({movieId : {name}}) => name)
	return await  movieServices.getAvailableMovies(movies)
	

}

//creat member and sub as well
const createSubscription = async (member) =>{
	const Createdmember = await memberService.creatMember(member)
	try {
		const subscription = new Subscription({memberId : Createdmember._id , movies : []})
		const subscriber = await subscription.save()
		return	await subscriber.populate("memberId")
	} catch {
		await Createdmember.remove()
		throw new Error("Something failed, Couldn`t Create Member")
	}
	
    
}

//update the member by the sub id
const updateSubscriptionMember = async (id,update) =>{
	const sub = await getSubsriptionById(id)
	await memberService.updateMember(sub.memberId,update)
	return await sub.populate(["memberId",{path : "movies.movieId", select : "name"}])
}

//get only the member by the sub id
const getMemberBySubsriptionId = async (id) => {
	const {memberId} = await Subscription.findById(id).populate("memberId","-_id")
	return memberId
}


//delete sub and remove it from members colection
const deleteSubscription = async (id) =>{
	const sub = await Subscription.findByIdAndRemove(id).lean()
	try {
		await memberService.deleteMember(sub.memberId)
	} catch {
		const newSub = new Subscription({...sub, _id : id})
		await newSub.save()
		throw new Error("Something failed, Couldn`t Delete Member")

	}
	
}

//get sub by id
const getSubsriptionById =  (id) => {
	return  Subscription.findById(id)

}

//get all subs with member and movie name
const getAllSubscriptions =  ()=> {
	return  Subscription.find().populate(["memberId",{path : "movies.movieId", select : "name"}])
}

//find sub based on member id
const findSubByMemberId =  (id) =>{
	return Subscription.findByMemberId(id)

}

const subscriptionExists =  (id) => {
	return Subscription.exists({_id : id})
	
 	
};

module.exports = {
	subscriptionExists,
	createSubscription,
	deleteSubscription,
	updateSubscriptionMember,
	getMemberBySubsriptionId,
	getAllSubscriptions,
	getMovieSubscriptions,
	findSubByMemberId,
	deleteMovieSubscriptions,
	addMovieToSubscription,
	moviesAvailable,
	getAllMoviesWithSubscriptions,
	initialize

};