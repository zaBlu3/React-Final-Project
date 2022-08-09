const PermessionJson = require("../DL/PermessionDL");
const userJson = require("../DL/UserJsonDL");
const userMongo = require("../DL/UsersMongoDL");
const fs = require("fs");

const authenticat = async (user, username, password) => {
	if (username == user.username && password == user.password) {
		const { firstname, lastname, permissions } = await GetDataById(user._id);
		return { name: firstname + " " + lastname, permissions };
	}
	throw new Error("authentication failed");
};

const register = async (user, password) => {
	console.log(user.password, password);
	if (user.password)
		throw new Error(
			"You are trying to register a USERNAME that already has password"
		);
	user.password = password;
	await user.save();
	const { firstname, lastname, permissions } = await GetDataById(user._id);
	return { name: firstname + " " + lastname, permissions };
};

// GET --> Get All (Read)
const getAllData = async () => {
	const mongoData = await userMongo.getAllUsers();
	const userData = await userJson.getAllData();
	const permissionsData = await PermessionJson.getAllPermessions();
	const allData = mongoData.map((user, index) => {
		delete user.password;
		let finaluser = { ...user, ...userData[index], ...permissionsData[index] };
		delete finaluser.id;
		return finaluser;
	});
	return allData;
};

// Get By Id (Read)
const GetDataById = async (userId) => {
	const mongoUser = await userMongo.getUser(userId);
	const user = await userJson.GetDataById(userId);
	const permissions = await PermessionJson.GetPermessionsById(userId);
	finaluser = { ...mongoUser, ...user, ...permissions };
	delete finaluser.password;
	delete finaluser.id;
	return finaluser;
};

// POST (Create)
const addData = async ({ username, firstname, lastname, permissions }) => {
	try {
		const { _id: id } = await userMongo.creatUser({ username });
		try {
			await userJson.addData({
				id,
				firstname,
				lastname,
				date: id.getTimestamp().toLocaleString(),
			});
			await PermessionJson.addPermessions({ id, permissions });
			return await GetDataById(id);
		} catch (err) {
			deleteData(id);
			console.log(err, "data delted");
		}
	} catch (error) {
		console.log(error, "data didnt save");
	}
};
const deleteData = async (userId) => {
	await userMongo.deleteUser(userId);
	await userJson.deleteData(userId);
	await PermessionJson.deletePermessions(userId);
};
const updateData = async (
	userId,
	{ username, firstname, lastname, permissions }
) => {
	await userMongo.updateUser(userId, { username });
	await userJson.updateData(userId, { firstname, lastname });
	await PermessionJson.updatePermessions(userId, permissions);
	return { id: userId, username, firstname, lastname, permissions };
};

async function initialize() {
	try {
		if (!(await userMongo.countUsers())) {
			fs.unlink("./configs/Permissions.json", function (err) {
				if (!err) console.log("Permissions File deleted!");
			});

			fs.unlink("./configs/Users.json", function (err) {
				if (!err) console.log("Users File deleted!");
			});
			await addData({
				username: "admin",
				firstname: "admin",
				lastname: "user",
				permissions: [
					"View Subscriptions",
					"Create Subscriptions",
					"Update Subscriptions",
					"Delete Subscriptions",
					"View Movies",
					"Create Movies",
					"Update Movies",
					"Delete Movies",
				],
			});
			const user = await userMongo.getUserName({ username: "admin" });
			await register(user, "Admin1234");
			console.log("admin user created successfuly");
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	getAllData,
	GetDataById,
	addData,
	deleteData,
	updateData,
	authenticat,
	register,
	initialize,
};
