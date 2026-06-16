import LoginButton from "../components/LoginButton";

function LoginPage() {
	return (
		<div className="container py-5 text-center">
			<h1>Login</h1>
			<p>Please sign in to access your tasks</p>

			<LoginButton />
		</div>
	);
}

export default LoginPage;
