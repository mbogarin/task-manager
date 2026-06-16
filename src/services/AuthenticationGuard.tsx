import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, type ComponentType } from "react";
import { useLocation } from "react-router-dom";

type AuthenticationGuardProps = {
	component: ComponentType;
};

function AuthenticationGuard({
	component: Component,
}: AuthenticationGuardProps) {
	const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
	const location = useLocation();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			loginWithRedirect({
				appState: {
					returnTo: location.pathname + location.search,
				},
			});
		}
	}, [
		isAuthenticated,
		isLoading,
		location.pathname,
		location.search,
		loginWithRedirect,
	]);

	if (isLoading || !isAuthenticated) {
		return <div>Redirecting...</div>;
	}

	return <Component />;
}

export default AuthenticationGuard;
