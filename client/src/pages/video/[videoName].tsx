import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { GET_VIDEO_BY_NAME } from "@/utils/crud/Query";

import { useEffect, useState } from "react";

import VideoRender from "@/components/VideoRender";

export default function VideoPage() {
    const router = useRouter();
    const { videoName } = router.query;
    console.log(videoName);
    const {loading, error, data} = useQuery(GET_VIDEO_BY_NAME, {variables: {filename: videoName}});


    return (
        <div>
            <h1>Video Page</h1>
            <p>This page is for displaying video content.</p>
            {loading? <p>Loading...</p> :<VideoRender vidStr={data.getOneVideo} />}
        </div>
    );
}