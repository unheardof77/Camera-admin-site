"use client";
import UploadFile from "@/components/UploadFile"


import { useEffect, useState } from "react";

export default function UploadPage() {
    const [loggedIn, setLoggedIn] = useState(true);

    if (loggedIn) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-8 text-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Upload File Here</h1>
                <UploadFile />
            </div>
        );
    } else {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-8 text-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Upload Page</h1>
                <p className="text-gray-600">You must be logged in to upload files.</p>
            </div>
        );
    }



}