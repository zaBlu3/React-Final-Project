import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LoginPage from "./frontend project/LoginPage";
import Main from "./frontend project/Main";
import { useState } from "react";
import LoginContext from "./frontend project/context/LoginContext";
import { Route, Routes } from "react-router-dom";
import ErrorComp from "./frontend project/error/ErrorComp";
function App() {
	const [isLogedin, setIsLogedin] = useState(!!sessionStorage["username"]);
	return (
		<div className="App">
			<LoginContext.Provider value={{ setIsLogedin }}>
				<Routes>
					<Route
						path="/login"
						element={
							!isLogedin ? (
								<LoginPage />
							) : (
								<ErrorComp error={"ALRAEDY loged in"} />
							)
						}
					/>
					<Route
						path="/*"
						element={
							!isLogedin ? (
								<ErrorComp
									error={
										<>
											you need to login first
											<br />
											<a href="/login">Click to redirect to login page</a>
										</>
									}
								/>
							) : (
								<Main />
							)
						}
					/>

					<Route path="*" element={<ErrorComp />} />
				</Routes>
			</LoginContext.Provider>
		</div>
	);
}

export default App;
