const jsonfile = require("jsonfile");
const permissionsJson = "./configs/Permissions.json";

// GET --> Get All (Read)
const getAllPermessions = async () => {
	return await jsonfile.readFile(permissionsJson);
};

// Get By Id (Read)
const GetPermessionsById = async (userId) => {
	const data = await jsonfile.readFile(permissionsJson);
	return data.find(({ id }) => id == userId);
};

// POST (Create)
const addPermessions = async (obj) => {
	try {
		const data = await jsonfile.readFile(permissionsJson);
		data.push(obj);
		await jsonfile.writeFile(permissionsJson, data, { spaces: 2 });
	} catch {
		console.log("couldnt read permessions json file , writing instead");
		await jsonfile.writeFile(permissionsJson, [obj], { spaces: 2 });
	}
};

// PUT (Update)
const updatePermessions = async (userId, permissions) => {
	const data = await jsonfile.readFile(permissionsJson);
	const index = data.findIndex(({ id }) => id == userId);
	if (index != -1) {
		data[index].permissions = permissions;
		await jsonfile.writeFile(permissionsJson, data, { spaces: 2 });
	}
};

// Delete (Delete)
const deletePermessions = async (id) => {
	const data = await jsonfile.readFile(permissionsJson);
	const index = data.findIndex((Data) => Data.id == id);
	if (index != -1) {
		const deleted = data.splice(index, 1);
		await jsonfile.writeFile(permissionsJson, data, { spaces: 2 });
    return deleted
	}
};

module.exports = {
	getAllPermessions,
	GetPermessionsById,
	updatePermessions,
	addPermessions,
	deletePermessions,
};
