import { useState } from "react"
import { useMutation } from "@apollo/client";
import { CREATE_ORG_OWNER } from "../utils/crud/Mutation";
import { create } from "domain";

export default function CreateOrgOwnerPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [orgName, setOrgName] = useState("");
    const [createOrgOwner, { data, loading, error }] = useMutation(CREATE_ORG_OWNER);

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "orgName") {
            setOrgName(value);
        }
    }

    const btnClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await createOrgOwner({ variables: { username, password, orgName } });
        } catch (err) {
            console.error("Error creating organization owner:", err);
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create Organization Owner</h1>

            <div className="space-y-4">
                <input
                    onChange={changeInputHandler}
                    name="username"
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={changeInputHandler}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={changeInputHandler}
                    name="orgName"
                    placeholder="Organization Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={btnClickHandler}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Create Org Owner
                </button>
            </div>
        </div>

    )
}