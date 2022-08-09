import React from "react";
import "./error.css";
import { useLocation } from "react-router-dom";
function ErrorComp({ error }) {
	const { state } = useLocation();

	return (
		<div id="notfound">
		
				
					<h3>Oops! Page not found</h3>
					<h1>
						<span>4</span>
						<span>0</span>
						<span>4</span>
					</h1>
				
				<h2> {state ? state.error : error} </h2>
			
		</div>
	);
}

export default ErrorComp;
