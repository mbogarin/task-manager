import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

function SignupButton() {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	const handleSignup = () => {
		loginWithRedirect({
			authorizationParams: {
				screen_hint: "signup",
			},
		});
	};

	if (!isAuthenticated)
		return (
			<Button className="ms-2" onClick={handleSignup}>
				Sign Up
			</Button>
		);
	return null;
}

export default SignupButton;
