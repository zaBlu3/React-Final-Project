const jsonfile = require("jsonfile");
const userJson = "./configs/Users.json";

// GET --> Get All (Read)
const getAllData = async () => {
	return await jsonfile.readFile(userJson);
};

// Get By Id (Read)
const GetDataById = async (userId) => {
	const data = await jsonfile.readFile(userJson);
	return data.find(({ id }) => id == userId);
};

// POST (Create)
const addData = async (obj) => {
	try {
		const data = await jsonfile.readFile(userJson);
		data.push(obj);
		await jsonfile.writeFile(userJson, data, { spaces: 2 });
	} catch {
		console.log("couldnt read user json file , writing instead");
		await jsonfile.writeFile(userJson, [obj], { spaces: 2 });
	}
};

// PUT (Update)
const updateData = async (userId, { firstname, lastname }) => {
	const data = await jsonfile.readFile(userJson);
	const index = data.findIndex(({ id }) => id == userId);
	if (index != -1) {
		data[index].firstname = firstname;
		data[index].lastname = lastname;
		await jsonfile.writeFile(userJson, data, { spaces: 2 });
	}
};

// Delete (Delete)
const deleteData = async (id) => {
	const data = await jsonfile.readFile(userJson);
	const index = data.findIndex((Data) => Data.id == id); // true / false
	if (index != -1) {
		const deleted = data.splice(index, 1);
		await jsonfile.writeFile(userJson, data, { spaces: 2 });
    return deleted
	}
};

module.exports = {
	getAllData,
	GetDataById,
	updateData,
	addData,
	deleteData,
};
