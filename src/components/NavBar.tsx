import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function Navbar() {
	const { isAuthenticated, logout } = useAuth0();
	// console.log("AUTH STATUS:", isAuthenticated);

	return (
		<nav className="navbar navbar-light bg-light px-5">
			<Link to="/" className="navbar-brand">
				Task Manager
			</Link>

			<div>
				{!isAuthenticated ? (
					<>
						<Link to="/login" className="btn btn-outline-primary">
							Login
						</Link>

						<Link
							to="/register"
							className="btn btn-outline-primary ms-2"
						>
							Sign Up
						</Link>
					</>
				) : (
					<button
						onClick={() =>
							logout({
								logoutParams: {
									returnTo: window.location.origin,
								},
							})
						}
					>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
