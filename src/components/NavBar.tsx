import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

function Navbar() {
	const { isAuthenticated, logout } = useAuth0();

	return (
		<nav className="navbar navbar-light bg-light px-5">
			<Link to="/" className="navbar-brand ">
				Task Manager
			</Link>

			<div>
				{!isAuthenticated ? (
					<>
						<LoginButton />

						<SignupButton />
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
