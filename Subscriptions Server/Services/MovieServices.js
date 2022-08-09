const Movie = require("../Models/MoviesModel");
const axios = require("axios");

const url = "https://api.tvmaze.com/shows";

async function initialize (){
	try {
		if (!await Movie.count()) {
			const { data } = await axios.get(url);
			data.splice(50)
			Movie.insertMany(data);
		}
	} catch ({ message }) {
		console.log(message);
	}
}

const getAvailableMovies =  (arrayOfNames)=> {
	return  Movie.find().where("name").nin(arrayOfNames).select("name")


}
const getMovie =  (id) => {
	return  Movie.findById(id)
}


const getAllMovies =  ()=> {
	return  Movie.find().lean()
}

const creatMovie = async (obj) =>{
	const movie = new Movie(obj)
	await movie.save()
	return movie.toObject()
}
const updateMovie =  (id,update) =>{
	return  Movie.findByIdAndUpdate(id,update,{new: true}).lean()
}
const deleteMovie =  (id) =>{
	return  Movie.findByIdAndRemove(id).lean()
}
const movieExists =  (id) => {
	return  Movie.exists({_id : id})
	
 	
};

module.exports = {
	creatMovie,
	deleteMovie,
	updateMovie,
	getMovie,
	getAllMovies,
	getAvailableMovies,
	movieExists,
	initialize
};