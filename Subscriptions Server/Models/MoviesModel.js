const mongoose = require("mongoose")



const movieSchema = new mongoose.Schema({

    name : {
        type : String,
        required :true,
    },

    genres : {
        type : [String],
        required :true,
    },

    image : {
        type : String,
        required :true,
        unique:true,
    },
    

    premiered : {
        get : v => v.toLocalString(),
        type : Date,
        required :true,
        min: '1988-01-01',
        max: new Date (new Date().setFullYear(new Date().getFullYear() +5))

    }

},{ versionKey: false})

//this is to save the data from the tvmaze api, image is an object which has 2 urls large and medium, here im checking if it in object then get back the medium url
movieSchema.path("image").set(function(value) {
    return typeof(value) === "object"? value.medium : value;
});

movieSchema.index({ name: 1, premiered: 1 }, { unique: true });//can note have a movie with the same name and date


const MovieModel = mongoose.model('Movie' , movieSchema);;


module.exports = MovieModel

