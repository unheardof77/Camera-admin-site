import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
mutation Upload($file: Upload!) {
  singleUpload(file: $file) {
    filename
  }
}
`

export const LOGIN =`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
      groupId
      isOrgOwner
    }
  }
}
`
export const ADMIN_LOGIN =`
mutation admin_Login($username: String!, $password: String!) {
  adminLogin(username: $username, password: $password) {
    token
    admin {
      username
      isAdmin
    }
  }
}
`

export const ADMIN_SIGNUP = gql`
    mutation Admin_Signup($username: String!, $password: String!, $adminPassword: String!) {
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
mutation Create_Org_Owner($username: String!, $password: String!, $orgName: String!) {
  createOrgOwner(username: $username, password: $password, orgName: $orgName) {
    username
  }
}
`

export const CREATE_EMPLOYEE_LOGIN = gql`
mutation Create_Employee($username: String!, $password: String!) {
  createEmployee(username: $username, password: $password) {
    _id
  }
}
`