import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubscribeToNewMovie from "./SubscribeToNewMovie";
import { Button } from "react-bootstrap";
import { havePermession } from "../utils/Utils";

function MemberMoviesWatched({ movies, subId }) {
	const [window, setWindow] = useState(false);

	return (
		<div className="memberMovies">
			<h4>Movies Watched</h4>
			{havePermession("Update Subscriptions") ? <Button className="mb-2" size="sm" onClick={() => setWindow(!window)}>
				{" "}
				sub to new movie
			</Button> : null}
			{window ? <SubscribeToNewMovie id={subId} /> : null}

			<ul>
				{movies.length
					? movies.map(({ movieId: { _id, name }, date }) => {
							return (
								<li key={_id}>
									<Link to={"/movies/?s=" + name}>{name}</Link>,{" "}
									{new Date(date).toDateString()}
								</li>
							);
					  })
					: null}
			</ul>
		</div>
	);
}

export default MemberMoviesWatched;
