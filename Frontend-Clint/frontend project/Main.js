
import {
	Routes,
	Route,
	
} from "react-router-dom";
import Users from "./usersPages/Users";
import Subscriptions from "./subscriptionsPages/Subscriptions";
import Movies from "./moviesPages/Movies";
import ErrorComp from "./error/ErrorComp";
import NavigationBar from "./navBars/NavigationBar";
import Welcome from "./welcomePage/Welcome";
import MovieContextProvider from "./context/MovieContext";
import SubscriptionsContextProvider from "./context/subscriptionsContext";
import UsersContextProvider from "./context/UsersContext";
function Main() {
	return (
		<div>
			<NavigationBar />
			<Routes>
				<Route index element={<Welcome />} />
				<Route
					path="users/*"
					element={
						<UsersContextProvider>
							<Users />
						</UsersContextProvider>
					}
				/>

				<Route
					path="movies/*"
					element={
						<MovieContextProvider>
							<Movies />
						</MovieContextProvider>
					}
				/>

				<Route
					path="subscriptions/*"
					element={
						<SubscriptionsContextProvider>
							<Subscriptions />
						</SubscriptionsContextProvider>
					}
				/>
				<Route path="*" element={<ErrorComp error={"no such rout"} />} />
			</Routes>
		</div>
	);
}

export default Main;
