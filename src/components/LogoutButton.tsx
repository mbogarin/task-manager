import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton: React.FC = () => {
	// Authentication:
	const { logout, isAuthenticated } = useAuth0();

	const handleLogout = () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};
	// Log out button:
	if (isAuthenticated) return <Button onClick={handleLogout}>Log out</Button>;
	return null;
};

export default LogoutButton;
