import Header from "./components/Header";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-900">
			{/* Header (justified between, middle focus, Brand "StreveHost", Links: "About, Service, Pricing", Bold Button: "Get Started") */}
			<Header />

			{/* Add any additional sections here */}
		</main>
	);
}
