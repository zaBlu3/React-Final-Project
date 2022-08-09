import React, { useContext } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { havePermession, ACTIONS } from "../utils/Utils";
import { SubscriptionsContext } from "../context/subscriptionsContext";
import Member from "./Member";
import FormTemplate from "../formTemplate/FormTemplate";
import PageNavBar from "../navBars/PageNavBar";
import OneSubscription from "./OneSubscription";

function Subscriptions() {
	const navigate = useNavigate();
	const { members, dispatch } = useContext(SubscriptionsContext);

	const getAllMembers = () => {
		return members.map((subscriptions) => {
			return (
				<Member
					key={subscriptions._id}
					subId={subscriptions._id}
					member={subscriptions.memberId}
					movies={subscriptions.movies}
				/>
			);
		});
	};

	return (
		<div className="">
			<PageNavBar page="Subscriptions" />
			<Routes>
				<Route
					path="/"
					element={<div className="members">{getAllMembers()}</div>}
				/>
				<Route path="/:id" element={<OneSubscription />} />
				<Route
					path="add"
					element={
						havePermession("Create Subscriptions") ? (
							<FormTemplate
							key={ACTIONS.ADD}
								title={ACTIONS.ADD}
								dispatch={dispatch}
								page="subscriptions"
							/>
						) : (
							<Navigate
								replace
								state={{ error: "YOU DONT HAVE PERMESSIONS" }}
								to={"/error"}
							/>
						)
					}
				/>
				<Route
					path=":id/edit"
					element={
						havePermession("Update Subscriptions") ? (
							<FormTemplate
							key={ACTIONS.UPDATE}
								title={ACTIONS.UPDATE}
								dispatch={dispatch}
								page="subscriptions"
							/>
						) : (
							<Navigate
								replace
								state={{ error: "YOU DONT HAVE PERMESSIONS" }}
								to={"/error"}
							/>
						)
					}
				/>
				<Route path="*" element={<Navigate to={-1} />} />
			</Routes>
		</div>
	);
}

export default Subscriptions;
