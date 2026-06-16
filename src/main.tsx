import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Auth0Provider
			domain="dev-gr4ek5mvf8qxy3k3.us.auth0.com"
			clientId="u66xIUb6QS6IWTM0wv4dGyOTcMI09VFc"
			authorizationParams={{ redirect_uri: window.location.origin }}
			onRedirectCallback={(appState) => {
				window.history.replaceState(
					{},
					document.title,
					appState?.returnTo || "/dashboard",
				);
			}}
		>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Auth0Provider>
	</StrictMode>,
);
