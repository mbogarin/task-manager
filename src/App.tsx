// [Imports]:
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import type { Task } from "./types/task";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/NavBar";

import DashboardPage from "./pages/DashboardPage";
// import CreateTaskPage from "./pages/CreateTaskPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthenticationGuard from "./services/AuthenticationGuard";

function App() {
	// [RETURNED JSX]:
	return (
		<TaskProvider>
			<Navbar />
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route
					path="/dashboard"
					element={<AuthenticationGuard component={DashboardPage} />}
				/>

				<Route
					path="/tasks/:id"
					element={
						<AuthenticationGuard component={TaskDetailsPage} />
					}
				/>
			</Routes>
		</TaskProvider>
	);
}

export default App;
