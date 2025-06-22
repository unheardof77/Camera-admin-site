import { useState } from "react"

import { useMutation } from "@apollo/client";
import { CREATE_EMPLOYEE_LOGIN } from "../../utils/crud/Mutation";
import { useSession } from "next-auth/react";

export default function CreateEmployeesPage(){
    const [empUser, setEmpUser] = useState<string>("");
    const [empPass, setEmpPass] = useState<string>("");
    const [firstIt, setFirstIt] = useState<boolean>(true);

    const {data: session, status} = useSession();


    const [createEmployeeLogin, {loading, error, data}] = useMutation(CREATE_EMPLOYEE_LOGIN);


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "empUser") {
            setEmpUser(value);
        } else if (name === "empPass") {
            setEmpPass(value);
        }
    }

    const btnClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if(!empPass || !empUser){ console.error("Username and password are required."); return; }
                
            await createEmployeeLogin({variables: {username: empUser, password: empPass, authToken:session?.authToken}});
            setFirstIt(false);
        }catch (err){
            console.error("Error creating employee login:", err);
        }
    }

    if(status === "unauthenticated")return <h1>You must login first.</h1>
    if(error)console.error(error.message);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8">
    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create Employees</h1>
    <p className="text-gray-600 mb-4">This page will allow you to create new employees.</p>
    
    <div className="space-y-4">
        <input
            onChange={inputChangeHandler}
            name="empUser"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
            onChange={inputChangeHandler}
            name="empPass"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            onClick={btnClickHandler}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
            Create Employee Login
        </button>
    </div>

    <div className="mt-4 text-sm text-gray-700">
        {loading ? (
            <p>Loading...</p>
        ) : firstIt ? (
            <p>Make some employees</p>
        ) : (
            <p>Created Employee ID: {data?.createEmployee._id}</p>
        )}
    </div>
</div>

    )
}