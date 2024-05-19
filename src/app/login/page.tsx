"use client";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
const endpoint = "http://localhost:8800";

export default function LoginPage() {
	const [name, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [alertMessage, setAlertMessage] = useState("");

	const handleSignup = async () => {
		const response = await fetch(`${endpoint}/api/auth/login/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: name, password }),
		});

		if (response.status == 200) {
			/* Redirect to services page */
			window.location.href = "/dashboard";
		} else {
            /* Read the error message from the response (ReadStream @ response.body) */
            const res = await response.json().catch(err => {
                setAlertMessage("An error occurred!");
            })

			setAlertMessage(res.message || "An error occurred!");
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
			<div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
				{alertMessage && (
					<div className="flex items-center bg-red-600 text-white text-sm font-bold px-4 py-3 mb-4 rounded-lg" role="alert">
						<FiAlertTriangle className="mr-2" />
						<p>{alertMessage}</p>
					</div>
				)}
				<div className="space-y-4">
					<input
						type="text"
						placeholder="Email"
						value={name}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
					<div className="relative w-full">
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value)
							}}
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
					</div>

					<button
						onClick={handleSignup}
						className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						Login
					</button>
				</div>
				<p className="text-center text-sm text-gray-400 mt-6">
					By signing up, you agree to our{" "}
					<a href="/tos" className="text-blue-600 hover:underline">
						Terms of Service
					</a>{" "}
					and{" "}
					<a href="/privacy" className="text-blue-600 hover:underline">
						Privacy Policy
					</a>.
				</p>
                <p className="text-center m-2">
                    Don't have an account?<span> </span>
                    <a href="/signup" className="text-blue-600 hover:underline">Create one</a>
                </p>
			</div>
		</main>
	);
}
