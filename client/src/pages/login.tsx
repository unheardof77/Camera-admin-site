import React, { useState, useEffect } from "react";

import { LOGIN } from "@/utils/crud/Mutation";
import { useMutation } from "@apollo/client";



export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, { data, loading, error }] = useMutation(LOGIN)

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const btnClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await login({ variables: { username, password } });
            console.log(data);
        } catch (err) {
            console.error("something went wrong", err)
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Login</h1>

            <div className="space-y-4">
                <input
                    name="username"
                    onChange={inputChangeHandler}
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="password"
                    type="password"
                    onChange={inputChangeHandler}
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={btnClickHandler}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </div>
        </div>

    )
}