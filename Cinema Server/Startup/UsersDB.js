const mongoose = require("mongoose");

const connectDB = async () => {
	const uri = "mongodb://localhost:27017/UsersDB";
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		family: 4,
	};
	try {
		await mongoose.connect(uri, options)
		console.log("connected to users DB")
	} catch (err) {
		console.log(err)
	}
	
	
		 
};
module.exports = connectDB;
