import { gql, useLazyQuery } from "@apollo/client";

const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
        name
        email
        password
    }
  }
`

export const useGetAllUsers = () => {
    const [getAllUsers, {loading, data, error}] = useLazyQuery(GET_ALL_USERS)
    return {getAllUsers, loading, data, error}
}