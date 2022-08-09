import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { Reducer,initalState } from "../reducer/reducer";
import ErrorComp from "../error/ErrorComp";
import { checkPermissionAnadRedirect,dispatchHelper,ACTIONS } from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import LoadingComp from "../loading/LoadingComp";


export const MovieContext = createContext();

const MovieContextProvider = (props) => {
	const [movies, dispatch] = useReducer(Reducer, initalState)
	const navigate = useNavigate()

	useEffect(() => {
		if(!checkPermissionAnadRedirect("View","Movies",(err=>navigate("/error",{state:{error:err},replace:true})))) return
		dispatchHelper(ACTIONS.INITIALIZE, "movies", dispatch);

	}, []);

	function findMovieById (id){
		return movies.find(({_id})=>id===_id)
	}
	const value = useMemo(()=>({movies,dispatch,findMovieById}),[movies,dispatch])

	
	return (
		<MovieContext.Provider value={value}>
			{movies.loading ? (
					<LoadingComp/>
			) : movies.errors ? (
				<ErrorComp error={movies.errors.error} /> 
			) : (
				props.children
			)}
		</MovieContext.Provider>
	);
};

export default MovieContextProvider;
