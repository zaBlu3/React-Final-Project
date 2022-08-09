import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import MoviesWatchedByMembers from "./MoviesWatchedByMembers";
import { havePermession, dispatchHelper, ACTIONS } from "../utils/Utils";
import { Card, Button } from "react-bootstrap";

function Movie({ movie }) {
	const navigate = useNavigate();
	const { dispatch } = useContext(MovieContext);

	return (
		<Card className="movie">
			<Card.Title>
				{" "}
				<>
					{movie.name}, {new Date(movie.premiered).getFullYear()}
				</>
			</Card.Title>

			<Card.Img variant="top" src={movie.image} />
			<Card.Body>
				<Card.Text>genres - {movie.genres.toString()}</Card.Text>

				<Card.Text>
					{havePermession("Update Movies") ? (
						<Button onClick={() => navigate(`../${movie._id}/edit`)}>
							edit
						</Button>
					) : null}
					{havePermession("Delete Movies") ? (
						<Button
							className="float-end"
							onClick={() =>
								dispatchHelper(ACTIONS.DELETE, "movies", dispatch, movie._id)
							}
						>
							delete
						</Button>
					) : null}
				</Card.Text>
				
			</Card.Body>
            <Card.Body>
            <MoviesWatchedByMembers id={movie._id} />
            </Card.Body>
		</Card>
	);
}

export default Movie;
