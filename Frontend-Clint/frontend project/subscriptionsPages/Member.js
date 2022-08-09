import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SubscriptionsContext } from "../context/subscriptionsContext";
import MemberMoviesWatched from "./MemberMoviesWatched";
import { dispatchHelper, ACTIONS, havePermession } from "../utils/Utils";
import { Card, Button } from "react-bootstrap";

function Member({ member: { name, email, city }, movies, subId }) {
	const navigate = useNavigate();
	const { dispatch } = useContext(SubscriptionsContext);
	return (
		<div className="">
			<Card className="member">
				<Card.Title as={"h1"}>
					{" "}
					<>
						<>{name}</>
					</>
				</Card.Title>

				<Card.Body>
					<Card.Text>Email - {email}</Card.Text>
					<Card.Text>City - {city}</Card.Text>
					{havePermession("Update Subscriptions") ? (
						<Button onClick={() => navigate(`/subscriptions/${subId}/edit`)}>edit</Button>
					) : null}
					{havePermession("Delete Subscriptions") ? (
						<Button
							className="float-end"
							onClick={() =>
								dispatchHelper(ACTIONS.DELETE, "subscriptions", dispatch, subId)
							}
						>
							delete
						</Button>
					) : null}

					
				</Card.Body>
				<Card.Body>
				<MemberMoviesWatched subId={subId} movies={movies} />
				</Card.Body>
			</Card>

			
		</div>
	);
}

export default Member;
