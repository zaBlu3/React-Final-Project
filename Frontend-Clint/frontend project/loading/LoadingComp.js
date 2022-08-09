import React from "react";
import "./loading.css";
import {  Placeholder } from "react-bootstrap";
function LoadingComp() {
	return (
		<div className="load">
			<span>LOADING...</span>
			<Placeholder className="mx-5" as="p" animation="glow">
				<Placeholder bg="success" xs={12} />
			</Placeholder>
		</div>
	);
}

export default LoadingComp;
