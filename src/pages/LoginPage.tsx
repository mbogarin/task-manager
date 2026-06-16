// import LoginButton from "../components/LoginButton";
// import SignupButton from "../components/SignupButton";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
	const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			navigate("/dashboard", { replace: true });
		}
	}, [isAuthenticated, isLoading, navigate]);

	const handleViewTasks = () => {
		if (isAuthenticated) {
			navigate("/dashboard", { replace: true });
			return;
		}

		loginWithRedirect({
			appState: { returnTo: "/dashboard" },
			authorizationParams: {
				prompt: "login",
			},
		});
	};

	return (
		<div className="container py-5 text-center">
			<h1 className="mb-3 fw-bold">Task Manager</h1>

			<h4 className="lead mb-5">
				Your daily tasks, simplified - create, track, and finish what
				matters most.
			</h4>

			{/* VIEW TASKS BUTTON (dashboard) */}
			<button
				className="btn btn-md btn-primary"
				onClick={handleViewTasks}
			>
				View Tasks
			</button>

			{/* REGISTER BUTTON */}
			<div className="mt-4">
				<button
					className="btn btn-sm btn-outline-secondary"
					onClick={() => navigate("/register")}
				>
					Don't have an account yet?
				</button>
			</div>
		</div>
	);
}

export default LoginPage;
