import { gql } from "@apollo/client";

export const GET_VIDEO_BY_NAME = gql`
    query One_Video($filename: String!) {
        getOneVideo(filename: $filename)
    }
`

export const GET_ALL_VIDEOS = gql`
    query All_Videos {
        getAllVidFilenames
    }
`