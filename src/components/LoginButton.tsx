import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton: React.FC = () => {
	// = Authentication:
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	const handleLogin = () => {
		loginWithRedirect({
			authorizationParams: {
				prompt: "login",
			},
		});
	};

	// = Log in button:
	if (!isAuthenticated) return <Button onClick={handleLogin}>Log in</Button>;
	return null;
};

export default LoginButton;
