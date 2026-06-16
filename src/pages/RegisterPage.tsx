import SignupButton from "../components/SignupButton";

function RegisterPage() {
	return (
		<div className="container py-5 text-center">
			<h1 className="mb-3 fw-bold">Create an Account</h1>
			<h1 className="lead mb-4">Get started on your planning here!</h1>

			<SignupButton />
		</div>
	);
}

export default RegisterPage;
