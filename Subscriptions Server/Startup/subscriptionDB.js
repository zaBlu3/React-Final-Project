const mongoose = require("mongoose");

const connectDB = () => {
	const uri = "mongodb://localhost:27017/SubscriptionsDB";
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		family: 4,
	};
	 mongoose.connect(uri, options)
		.then(() => console.log("connected to Subscriptions DB"))
		.catch((err) => console.log(err));
};
module.exports = connectDB;
