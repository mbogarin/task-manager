import { Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar";
import DashboardPage from "./pages/DashboardPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthenticationGuard from "./services/AuthenticationGuard";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				{/* Login page: */}
				<Route path="/" element={<LoginPage />} />

				{/* Register page: */}
				<Route path="/register" element={<RegisterPage />} />

				{/* Dashboard page: (auth) */}
				<Route
					path="/dashboard"
					element={<AuthenticationGuard component={DashboardPage} />}
				/>

				{/* Task Details page (auth) */}
				<Route
					path="/tasks/:id"
					element={
						<AuthenticationGuard component={TaskDetailsPage} />
					}
				/>
			</Routes>
		</>
	);
}

export default App;
