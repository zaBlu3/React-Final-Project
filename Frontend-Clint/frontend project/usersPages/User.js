import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dispatchHelper, ACTIONS } from "../utils/Utils";
import { UsersContext } from "../context/UsersContext";
import { Card, Button } from "react-bootstrap";

function User({ user }) {
	const navigate = useNavigate();
	const { dispatch } = useContext(UsersContext);

	return (
		<div className="">
			<Card className="user">
				<Card.Title as={"h1"}>
					{" "}
					Name - {user.firstname + " " + user.lastname}
				</Card.Title>

				<Card.Body>
					<Card.Text>UserName - {user.username} </Card.Text>
					<Card.Text>Date - {user.date}</Card.Text>
					<Card.Text>permessions - {user.permissions.toString()}</Card.Text>
                    {user.username === "admin" ? null : <>
                     <Button className="mr-2" onClick={() => navigate(`../${user._id}/edit`)}>edit</Button>
					<Button
						onClick={() =>
							dispatchHelper(ACTIONS.DELETE, "users", dispatch, user._id)
						}
					>
						delete
					</Button>{" "}
                    </>
					}
					
					
				</Card.Body>
			</Card>
			
		</div>
	);
}

export default User;
