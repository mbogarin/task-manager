// import React from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";

// type Auth0ProviderWithNavigateProps = {
// 	children: any;
// };

// const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({
// 	children,
// }) => {
// 	const navigate = useNavigate();
// 	const domain = "dev-gr4ek5mvf8qxy3k3.us.auth0.com";
// 	const clientId = "u66xIUb6QS6IWTM0wv4dGyOTcMI09VFc";
// 	const redirectUri = "http://localhost:5173/callback";

// 	const onRedirectCallback = (appState: any) => {
// 		navigate((appState && appState.returnTo) || window.location.pathname);
// 	};

// 	if (!(domain && clientId && redirectUri)) {
// 		return null;
// 	}

// 	return (
// 		<Auth0Provider
// 			domain={domain}
// 			clientId={clientId}
// 			authorizationParams={{
// 				redirect_uri: redirectUri,
// 				scope: "openid profile email",
// 			}}
// 			onRedirectCallback={onRedirectCallback}
// 			cacheLocation="localstorage"
// 		>
// 			{children}
// 		</Auth0Provider>
// 	);
// };

// export default Auth0ProviderWithNavigate;
