
import { useState } from "react"
import { useMutation } from "@apollo/client";

import { ADMIN_SIGNUP } from "../utils/crud/Mutation";
import AuthService from "@/utils/auth/auth";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const [createAdmin, { data, loading, error }] = useMutation(ADMIN_SIGNUP);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "adminpassword") {
            setAdminPassword(value);
        }
    }

    const btnClickHandler = async () => {
        try {
            createAdmin({ variables: { username, password, adminPassword } });
            AuthService.login(data?.createAdmin.token);
        } catch (err) {
            console.error("Error creating admin:", err);
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Signup Page</h1>
            <p className="text-gray-600">This is the signup page.</p>
            <p className="text-gray-600">Here you can create a new account.</p>
            <p className="text-gray-600 mb-4">Fill in your details to get started!</p>

            <div className="space-y-4">
                <input
                    onChange={handleInputChange}
                    name="username"
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={handleInputChange}
                    name="adminpassword"
                    type="password"
                    placeholder="Admin Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={btnClickHandler}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Create Admin
                </button>
            </div>

            <div className="mt-4 text-sm text-gray-700">
                {loading ? (
                    <p>Submitting...</p>
                ) : (
                    <p>Created admin {data?.createAdmin.admin.username}</p>
                )}
            </div>
        </div>

    )
};