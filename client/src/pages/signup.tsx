
import { useState } from "react"
import { useMutation } from "@apollo/client";

import { ADMIN_SIGNUP } from "../utils/crud/Mutation";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const [createAdmin, {data, loading, error}] = useMutation(ADMIN_SIGNUP);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }else if (name === "adminpassword") {
            setAdminPassword(value);
        }
    }   

    const btnClickHandler = async () => {
        try {
            createAdmin({variables: { username, password, adminPassword }});
        } catch (err){
            console.error("Error creating admin:", err);
        }
    }

    return (
        <div>
            <h1>Signup Page</h1>
            <p>This is the signup page.</p>
            <p>Here you can create a new account.</p>
            <p>Fill in your details to get started!</p>
            <input onChange={handleInputChange} name="username"/>
            <input onChange={handleInputChange} name="password"/>
            <input onChange={handleInputChange} name="adminpassword"/>
            <button onClick={btnClickHandler}>Create Admin</button>
            <div>
                {loading? <p>submitting...</p> : <p>Created admin {data?.createAdmin.admin.username}</p>}
            </div>
        </div>
    )
};