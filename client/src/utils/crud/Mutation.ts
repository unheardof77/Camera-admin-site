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
      username
    }
  }
}
`

export const ADMIN_SIGNUP = gql`
    mutation Mutation($username: String!, $password: String!, $adminPassword: String!) {
  createAdmin(username: $username, password: $password, adminPassword: $adminPassword) {
    admin {
      username
      password
      _id
    }
  }
}
`
export const CREATE_ORG_OWNER = gql`
mutation Mutation($username: String!, $password: String!, $orgName: String!) {
  createOrgOwner(username: $username, password: $password, orgName: $orgName) {
    username
  }
}
`

export const CREATE_EMPLOYEE_LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
  createEmployee(username: $username, password: $password) {
    _id
  }
}
`