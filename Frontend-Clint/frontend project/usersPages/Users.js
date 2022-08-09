import React, { useContext } from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import { ACTIONS } from "../utils/Utils";
import { UsersContext } from "../context/UsersContext";
import PageNavBar from "../navBars/PageNavBar";
import User from "./User";
import FormTemplate from "../formTemplate/FormTemplate";

function Users() {
	const { users, dispatch } = useContext(UsersContext);

	return (
		<div>
			<PageNavBar page="Users" />

			<Routes>
				<Route
					path="/"
					element={
						<div className="users">
							{users.map((user) => { console.log(user);
								return <User key={user._id} user={user} />;
							})}
						</div>
					}
				/>
				<Route
					path="add"
					element={
						<FormTemplate
							key={ACTIONS.ADD}
							title={ACTIONS.ADD}
							dispatch={dispatch}
							page="users"
						/>
					}
				/>
				<Route
					path=":id/edit"
					element={
						<FormTemplate
							key={ACTIONS.UPDATE}
							title={ACTIONS.UPDATE}
							dispatch={dispatch}
							page="users"
						/>
					}
				/>
				<Route path="*" element={<Navigate to={-1} />} />

			</Routes>
		</div>
	);
}

export default Users;
