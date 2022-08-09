const Member = require("../Models/MembersModel");



//not used
const getMember =  (id) => {
	return  Member.findById(id)
}

//not used
const getAllMembers =  ()=> {
	return  Member.find()
}

const creatMember = async (obj) =>{
	const member = new Member(obj)
	return await member.save()
	

}
const updateMember =  (id,update) =>{
	return  Member.findByIdAndUpdate(id,update,{new: true})
}
const deleteMember = (id) =>{
	return Member.findByIdAndRemove(id)

}

module.exports = {
	creatMember,
	deleteMember,
	updateMember,
	getMember,
	getAllMembers
};