import { useApolloClient, useMutation } from "@apollo/client"

import { UPLOAD_FILE } from "@/utils/crud/Mutation";
import React from "react";

export default function UploadFile() {
    const [uploadFileMutation] = useMutation(UPLOAD_FILE);
    const apolloClient = useApolloClient();

    const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files, validity } = e.target;
        if (validity.valid && files && files[0]) {
            uploadFileMutation({ variables: { file: files[0] } }).then(() => {
                apolloClient.resetStore();
            })
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8">
            <input
                type="file"
                required={true}
                onChange={fileUploadHandler}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-gray-50
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

    )
};