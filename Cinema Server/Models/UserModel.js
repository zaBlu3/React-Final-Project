const {Schema, model} = require("mongoose")



const userSchema = new Schema({

    username : {
        type : String,
        required :true,
        unique : true
    },

    password : {
        type : String,
        
    },
   

},{ versionKey: false})


module.exports = model('User' , userSchema);;

