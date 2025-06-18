import { gql } from "@apollo/client";

export const GET_VIDEO_BY_NAME = gql`
    query Query($filename: String!) {
        getOneVideo(filename: $filename)
    }
`

export const GET_ALL_VIDEOS = gql`
    query Query {
        getAllVidFilenames
    }
`