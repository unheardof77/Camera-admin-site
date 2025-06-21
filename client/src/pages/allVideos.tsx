
import { useQuery } from "@apollo/client";
import { GET_ALL_VIDEOS } from "@/utils/crud/Query";
import FileCard from "@/components/FileCard";
import React from "react";
import { useSession } from "next-auth/react";

export default function AllVideosPage(){
    const {data: session} = useSession();
    
    const {loading, error, data} = useQuery(GET_ALL_VIDEOS, {variables:{authToken:session?.authToken}});

    if(loading)return <h1>Loading...</h1>
    if(error) console.error(error.message)

    return (
        <div>
            {data?.getAllVidFilenames.map((filename: string) =>(
                <FileCard uniqueId={filename} filename={filename} />
            ))}
        </div>
    )
}