import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { GET_VIDEO_BY_NAME } from "../../../utils/crud/Query";

import { useEffect, useState } from "react";

import VideoRender from "../../../components/VideoRender";
import { useSession } from "next-auth/react";

export default function VideoPage() {
    const {data: session} = useSession();
    const router = useRouter();
    const { videoName } = router.query;
    console.log(videoName);
    
    const { loading, error, data } = useQuery(GET_VIDEO_BY_NAME, { variables: { filename: videoName, authToken:session?.authToken } });


    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mt-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Video Page</h1>
            <p className="text-gray-600 mb-4">This page is for displaying video content.</p>
            {loading ? (
                <p className="text-blue-600 font-medium">Loading...</p>
            ) : (
                <VideoRender vidStr={data?.getOneVideo} />
            )}
        </div>

    );
}