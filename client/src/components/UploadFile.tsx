import { useApolloClient, useMutation } from "@apollo/client"

import { UPLOAD_FILE } from "../utils/crud/Mutation";
import React, {useState} from "react";
import { useSession } from "next-auth/react";

export default function UploadFile() {
    const [uploadFileMutation, {data, loading}] = useMutation(UPLOAD_FILE);
    const [firstIt, setFirstIt] = useState(true);
    const apolloClient = useApolloClient();
    const {data:session} = useSession();

    const fileUploadHandler = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const { files, validity } = e.target;
        if (validity.valid && files && files[0]) {
            await uploadFileMutation({ variables: { file: files[0], authToken:session?.authToken } })
            setFirstIt(false);
            await apolloClient.resetStore();
        }
    }

    const whatMessage = ()=>{
        let status, filename;
        if(data){
            status = data.singleUpload.status;
            filename = data.singleUpload.filename

        }
        if(firstIt)return <p>Upload your file above.</p>
        if(status === "success"){
            return <p>Uploaded {filename}</p>
        }else{
            return <p>There was an issue uploading your file, {filename}.</p>
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
            {whatMessage()}
        </div>

    )
};