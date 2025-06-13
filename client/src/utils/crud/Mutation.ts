import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
mutation Mutation($file: Upload!) {
  singleUpload(file: $file) {
    filename
  }
}
`

export const LOGIN = gql`
    mutation Mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
            }
        }
    }
`