"use client";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
const endpoint = "http://localhost:8800";

export default function SignupPage() {
	const [email, setEmail] = useState("");
	const [name, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [alertMessage, setAlertMessage] = useState("");

	const handleSignup = async () => {
		if(!email || !name || !password || !confirmPassword) {
			setAlertMessage("Please make sure to fill in everything!");
			return;
		}

		if (passwordStrength < 3) {
			setAlertMessage("Password is too weak!");
			return;
		}

		if(!email.includes("@") || !email.includes(".") || email.length < 5) {
			setAlertMessage("Invalid email address!");
			return;
		}

		if(name.length < 3) {
			setAlertMessage("Username must be at least 3 characters long!");
			return;
		}

		if(name.length > 12) {
			setAlertMessage("Username must be at most 12 characters long!");
			return;
		}

		if(password.length < 6) {
			setAlertMessage("Password must be at least 6 characters long!");
			return;
		}
		
		if (password !== confirmPassword) {
			setAlertMessage("Passwords do not match!");
			return;
		}

		const response = await fetch(`${endpoint}/api/users/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, name, password }),
		});

		if (response.ok) {
			/* Redirect to services page */
			window.location.href = "/dashboard";
		} else {
			setAlertMessage("Signup failed! Please try again.");
		}
	};

	const evaluatePasswordStrength = (password: string) => {
		let strength = 0;
		password = password.trim();
		if (password.length > 5) strength += 1;
		if (password.length > 10) strength += 1;
		if (/[A-Z]/.test(password)) strength += 1;
		if (/[0-9]/.test(password)) strength += 1;
		if (/[^A-Za-z0-9]/.test(password)) strength += 1;
		setPasswordStrength(strength);
	};

	const getPasswordStrengthColor = (strength: number) => {
		switch (strength) {
			case 1:
				return "bg-red-500";
			case 2:
				return "bg-yellow-500";
			case 3:
				return "bg-yellow-600";
			case 4:
				return "bg-green-500";
			case 5:
				return "bg-green-700";
			default:
				return "bg-gray-300";
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
			<div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
				{alertMessage && (
					<div className="flex items-center bg-red-600 text-white text-sm font-bold px-4 py-3 mb-4 rounded-lg" role="alert">
						<FiAlertTriangle className="mr-2" />
						<p>{alertMessage}</p>
					</div>
				)}
				<div className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
					<input
						type="text"
						placeholder="Username"
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
								setPassword(e.target.value);
								evaluatePasswordStrength(e.target.value);
							}}
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
						<div className="absolute right-0 top-0 h-full flex items-center px-4">
							<div className={`h-2 w-2 rounded-full ${getPasswordStrengthColor(passwordStrength)}`}></div>
						</div>
					</div>
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
					<button
						onClick={handleSignup}
						className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						Sign Up
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
					Already have an account?<span> </span>
                    <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
			</div>
		</main>
	);
}
