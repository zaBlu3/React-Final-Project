const User = require("../Models/UserModel");




const countUsers = async () =>{
	return await User.count();
	 
}
const getUserName = async (username) =>{
    const user = await User.findOne(username);
    return user
}

const getUser = async (id) => {
	return await User.findById(id).lean()
}


const getAllUsers = async ()=> {
	return await User.find().lean()
}

const creatUser = async (obj) =>{
	const user = new User(obj)
	await user.save()
	return user.toObject()
}
const updateUser = async (id,update) =>{
	await User.findByIdAndUpdate(id,update)
}
const deleteUser = async (id) =>{
	await User.findByIdAndRemove(id)
}

module.exports = {
	creatUser,
	deleteUser,
	updateUser,
	getUser,
	getAllUsers,
    countUsers,
    getUserName
};