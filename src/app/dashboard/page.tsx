"use client";
import { useState } from "react";
import { FiHome, FiSettings, FiServer, FiUser } from "react-icons/fi";

type Service = {
	id: number;
	name: string;
	type: string;
	status: 'active' | 'disabled' | 'suspended' | 'inactive';
};

type SidebarProps = {
	setPage: (page: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setPage }) => (
	<div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
		<div className="p-6">
			<h1 className="text-2xl font-bold">Dashboard</h1>
		</div>
		<nav className="flex-1 px-2 space-y-1">
			<button
				onClick={() => setPage("home")}
				className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white w-full"
			>
				<FiHome className="mr-3" /> Home
			</button>
			<button
				onClick={() => setPage("services")}
				className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white w-full"
			>
				<FiServer className="mr-3" /> Services
			</button>
			<button
				onClick={() => setPage("settings")}
				className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white w-full"
			>
				<FiSettings className="mr-3" /> Settings
			</button>
			<button
				onClick={() => setPage("profile")}
				className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white w-full"
			>
				<FiUser className="mr-3" /> Profile
			</button>
		</nav>
	</div>
);

const HomePage: React.FC = () => (
	<div className="flex-1 p-6">
		<h1 className="text-2xl font-bold text-white">Home Page</h1>
		<p className="text-gray-400">Welcome to the home page!</p>
	</div>
);

type ServicesPageProps = {
	services: Service[];
	handleStart: (id: number) => void;
	handleStop: (id: number) => void;
	handleEdit: (id: number) => void;
	handleDelete: (id: number) => void;
};

const ServicesPage: React.FC<ServicesPageProps> = ({ services, handleStart, handleStop, handleEdit, handleDelete }) => (
	<div className="flex-1 p-6">
		<h1 className="text-2xl font-bold text-white mb-6">Services</h1>
		<table className="min-w-full bg-gray-700 rounded-lg">
			<thead>
				<tr>
					<th className="py-3 px-6 text-left">Name</th>
					<th className="py-3 px-6 text-left">Type</th>
					<th className="py-3 px-6 text-left">Status</th>
					<th className="py-3 px-6 text-left">Actions</th>
				</tr>
			</thead>
			<tbody>
				{services.map(service => (
					<tr key={service.id} className="border-t border-gray-600">
						<td className="py-3 px-6">{service.name}</td>
						<td className="py-3 px-6">{service.type}</td>
						<td className="py-3 px-6">
							<span className={`px-2 py-1 rounded-full text-sm ${service.status === 'active' ? 'bg-green-600' : service.status === 'disabled' ? 'bg-yellow-600' : service.status === 'suspended' ? 'bg-red-600' : 'bg-gray-600'}`}>
								{service.status}
							</span>
						</td>
						<td className="py-3 px-6">
							<button onClick={() => handleStart(service.id)} className="bg-blue-600 px-2 py-1 rounded mr-2">Start</button>
							<button onClick={() => handleStop(service.id)} className="bg-yellow-600 px-2 py-1 rounded mr-2">Stop</button>
							<button onClick={() => handleEdit(service.id)} className="bg-green-600 px-2 py-1 rounded mr-2">Edit</button>
							<button onClick={() => handleDelete(service.id)} className="bg-red-600 px-2 py-1 rounded">Delete</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const SettingsPage: React.FC = () => (
	<div className="flex-1 p-6">
		<h1 className="text-2xl font-bold text-white">Settings Page</h1>
		<p className="text-gray-400">Manage your settings here.</p>
	</div>
);

const ProfilePage: React.FC = () => (
	<div className="flex-1 p-6">
		<h1 className="text-2xl font-bold text-white">Profile Page</h1>
		<p className="text-gray-400">Manage your profile here.</p>
	</div>
);

const Dashboard: React.FC = () => {
	const [page, setPage] = useState<string>("services");
	const [services, setServices] = useState<Service[]>([
		{ id: 1, name: "Service One", type: "Type A", status: "active" },
		{ id: 2, name: "Service Two", type: "Type B", status: "disabled" },
		{ id: 3, name: "Service Three", type: "Type C", status: "suspended" },
		{ id: 4, name: "Service Four", type: "Type D", status: "inactive" },
	]);

	const handleStart = (id: number) => {
		setServices(services.map(service => service.id === id ? { ...service, status: "active" } : service));
	};

	const handleStop = (id: number) => {
		setServices(services.map(service => service.id === id ? { ...service, status: "inactive" } : service));
	};

	const handleEdit = (id: number) => {
		alert(`Edit service with id: ${id}`);
	};

	const handleDelete = (id: number) => {
		setServices(services.filter(service => service.id !== id));
	};

	return (
		<div className="flex h-screen">
			<Sidebar setPage={setPage} />
			<div className="flex-1 bg-gray-900 text-white">
				{page === "home" && <HomePage />}
				{page === "services" && (
					<ServicesPage
						services={services}
						handleStart={handleStart}
						handleStop={handleStop}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				)}
				{page === "settings" && <SettingsPage />}
				{page === "profile" && <ProfilePage />}
			</div>
		</div>
	);
};

export default Dashboard;
