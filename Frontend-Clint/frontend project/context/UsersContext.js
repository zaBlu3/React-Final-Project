import React, { createContext, useEffect, useMemo, useReducer } from "react";

import { Reducer,initalState } from "../reducer/reducer";
import ErrorComp from "../error/ErrorComp";

import { checkAdmin,dispatchHelper,ACTIONS } from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import LoadingComp from "../loading/LoadingComp";


export const UsersContext = createContext();

const UsersContextProvider = (props) => {
	const [users, dispatch] = useReducer(Reducer, initalState)
	const navigate = useNavigate()

	useEffect(() => {
		if(!checkAdmin()) return navigate("/error",{state:{error:"ONLY ADMIN CAN VIEW THIS SITE"},replace:true}) 
		dispatchHelper(ACTIONS.INITIALIZE, "users", dispatch);

	}, []);


	
	
	return (
		<UsersContext.Provider value={{dispatch,users}}>
			{users.loading ? (
				<LoadingComp/>
			) : users.errors ? (
				<ErrorComp error={users.errors.error} /> 
			) : (
				props.children
			)}
		</UsersContext.Provider>
	);
};

export default UsersContextProvider;
