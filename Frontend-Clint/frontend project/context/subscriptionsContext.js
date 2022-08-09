import React, { createContext, useEffect, useMemo, useReducer } from "react";

import { Reducer,initalState } from "../reducer/reducer";
import ErrorComp from "../error/ErrorComp";

import { checkPermissionAnadRedirect,dispatchHelper,ACTIONS } from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import LoadingComp from "../loading/LoadingComp";


export const SubscriptionsContext = createContext();

const SubscriptionsContextProvider = (props) => {
	const [members, dispatch] = useReducer(Reducer, initalState)
	const navigate = useNavigate()

	useEffect(() => {
		if(!checkPermissionAnadRedirect("View","Subscriptions",(err=>navigate("/error",{state:{error:err},replace:true})))) return
		dispatchHelper(ACTIONS.INITIALIZE, "subscriptions", dispatch);

	}, []);

	function findMemberByMemberId (id){
		return members.find(({memberId})=> id===memberId._id)
	}

	const value = useMemo(()=>({members,dispatch,findMemberByMemberId}),[members,dispatch])


	
	return (
		<SubscriptionsContext.Provider value={value}>
			{members.loading ? (
				<LoadingComp/>
			) : members.errors ? (
				<ErrorComp error={members.errors.error} />  
			) : (
				props.children
			)}
		</SubscriptionsContext.Provider>
	);
};

export default SubscriptionsContextProvider;
