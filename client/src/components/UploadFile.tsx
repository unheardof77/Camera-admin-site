import { useApolloClient, useMutation } from "@apollo/client"

import { UPLOAD_FILE } from "@/utils/crud/Mutation";
import React from "react";

export default function UploadFile() {
    const [uploadFileMutation] = useMutation(UPLOAD_FILE);
    const apolloClient = useApolloClient();

    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {files, validity} = e.target;
        if(validity.valid && files && files[0]) {
            uploadFileMutation({variables: {file: files[0]}}).then( ()=> {
                apolloClient.resetStore();
            })
        }
    }

    return (
        <div>
            <input type="file" required={true} onChange={fileUploadHandler} />
        </div>
    )
};