import gql from "graphql-tag";
const SIGNUP_MUTATION = gql`
  mutation createUser($email: String!, $userName: String!, $password: String!) {
    userInput(email: $email, userName: $userName, password: $password) {
      user {
        email
        userName
        password
      }
    }
  }
`;

export { SIGNUP_MUTATION };
