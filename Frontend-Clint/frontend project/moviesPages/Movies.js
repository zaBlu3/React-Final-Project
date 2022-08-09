import React, { useContext } from "react";
import {
	Route,
	Routes,
	useNavigate,
	useSearchParams,
	Navigate,
} from "react-router-dom";
import { havePermession, goToPage, ACTIONS } from "../utils/Utils";
import { MovieContext } from "../context/MovieContext";
import PageNavBar from "../navBars/PageNavBar";
import Movie from "./Movie";

import FormTemplate from "../formTemplate/FormTemplate";
//import ErrorComp from "./error/ErrorComp";

function Movies() {
	const [searchParams] = useSearchParams();
	const { movies, dispatch, findMovieById } = useContext(MovieContext);

	//search mpvie based on the param (?s="")
	const searchMovie = () => {
		//if there is param convert it to lower case
		const search = (searchParams.get("s") ?? "").toLocaleLowerCase();
		return movies
			.filter(({ name }) => name.toLowerCase().includes(search))
			.map((movie) => {
				return <Movie key={movie._id} movie={movie} />;
			});
	};

	return (
		<div className="">
			<PageNavBar page="Movies"/>
		
				<Routes>
					<Route path="/" element={<div className="movies">{searchMovie()}</div>} />
					<Route
						path="add"
						element={
							havePermession("Create Movies") ? (
								<FormTemplate
									key={ACTIONS.ADD}
									title={ACTIONS.ADD}
									dispatch={dispatch}
									page="movies"
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
							havePermession("Update Movies") ? (
								<FormTemplate
									key={ACTIONS.UPDATE}
									title={ACTIONS.UPDATE}
									dispatch={dispatch}
									moviesOnly={findMovieById}
									page="movies"
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

export default Movies;
