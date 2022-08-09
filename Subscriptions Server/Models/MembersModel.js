const mongoose = require("mongoose")



const memberSchema = new mongoose.Schema({

    name : {
        type : String,
        required :true,
    },

    email : {
        type : String,
        required :true,
        unique : true
    },

    city : {
        type : String,
        required :true,
    }

},{ versionKey: false})


module.exports = mongoose.model('Member' , memberSchema);;

