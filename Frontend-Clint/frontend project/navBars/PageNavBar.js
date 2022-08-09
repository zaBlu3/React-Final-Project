import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "../moviesPages/SearchBar";
import { checkNavLink } from "../utils/Utils";
function PageNavBar({ page }) {
	return (
		<Navbar bg="primary" variant="dark">
			<Nav className="mr-auto">
				<Navbar.Brand>{page}</Navbar.Brand>
			</Nav>

			<Nav>
				<NavLink
					end
					className={"nav-link"}
					to={""}
					
				>
					All {page}
				</NavLink>
				<NavLink
					className={"nav-link"}
					to={`add`}
					onClick={page!=="Users" ? (e) => checkNavLink(e, "Create", page) : null}
				>
					Add {page.slice(0, -1)}
				</NavLink>
			</Nav>
			{page === "Movies" ? <SearchBar label={"Find Movie"} /> : null}
		</Navbar>
	);
}

export default PageNavBar;
