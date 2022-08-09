import React, { useContext, useEffect, useState } from "react";
import { SubscriptionsContext } from "../context/subscriptionsContext";
import { dispatchHelper, requests, ACTIONS } from "../utils/Utils";
import { Form, Button, Row, Col } from "react-bootstrap";
function SubscribeToNewMovie({ id }) {
	const [availableMovies, setAvailableMovies] = useState([{ _id: {} }]);
	const [movieId, setMovieId] = useState();
	const { dispatch } = useContext(SubscriptionsContext);

	useEffect(() => {
		async function getAvailableMovies() {
			const data = await requests.getDataById(
				"subscriptions",
				id + "/available"
			);
			setAvailableMovies(() => data);
		}
		getAvailableMovies();
	}, []);

	useEffect(() => {
		if(availableMovies.length) setMovieId(availableMovies[0]._id); //setting the movie id as the first available movie in the list
	}, [availableMovies]);

	const subscribeToMovie = async (e) => {
		e.preventDefault();
		const error = await dispatchHelper(
			ACTIONS.UPDATE,
			"subscriptions",
			dispatch,
			id + "/addmovie",
			{ movieId }
		);
		if (!Object.keys(error).length)
			setAvailableMovies(availableMovies.filter(({ _id }) => _id !== movieId));
	};

	return (
		<div className="subscribeToMovie">
			<h6>add a new movie</h6>
			<Form onSubmit={subscribeToMovie}>
                <Row>
                    <Col >
                    <Form.Select size="sm" onChange={({ target: { value } }) => setMovieId(value)}
                    							name="movieId"

                    >
                        {availableMovies.length ? availableMovies.map(({ name, _id }) => {
								return (
									<option key={_id} value={_id}>
										{name}
									</option>
								);
							}):null}
                    </Form.Select>
                    </Col >
                    <Col xs={5}>
                    <Form.Control disabled size="sm" defaultValue={new Date().toISOString().split("T")[0]} type="date" />

                    </Col>
                </Row>
                <Row className="mt-2 text-center">
                    <Col>
                    {availableMovies.length ? <Button  type="submit">add</Button> : null}

                    </Col>

                </Row>
              
			</Form>
            </div>

	);
}

export default SubscribeToNewMovie;
