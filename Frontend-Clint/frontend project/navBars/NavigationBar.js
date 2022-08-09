import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import { checkNavLink, checkAdmin } from "../utils/Utils";

function NavigationBar(props) {
	const { setIsLogedin } = useContext(LoginContext);

	function logOut() {
		sessionStorage.clear();
		setIsLogedin(false);
	}
	return (
		<Navbar sticky="top"  bg="dark" variant="dark" collapseOnSelect expand="md">
			<Container>
				<Navbar.Brand style={{ fontSize: "2rem" }}>Movies - Subscriptions Web Site</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<NavLink 
							className={"nav-link"}
							to={"/movies"}
							onClick={(e) => checkNavLink(e, "View", "Movies")}
						>
							{" "}
							Movies
						</NavLink>
						<NavLink
							className={"nav-link"}
							to={"/subscriptions"}
							onClick={(e) => checkNavLink(e, "View", "Subscriptions")}
						>
							{" "}
							Subscriptions
						</NavLink>
						{checkAdmin() ? (
							<NavLink className={"nav-link"} to={"/users"}>
								{" "}
								Users Managment
							</NavLink>
						) : null}
					</Nav>
					<Nav>
						<NavDropdown title={sessionStorage["name"]}>
							<NavLink
								className={"dropdown-item"}
								to={"/login"}
								onClick={logOut}
							>
								{" "}
								Logout{" "}
							</NavLink>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
