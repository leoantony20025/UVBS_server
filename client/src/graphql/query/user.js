import { gql, useQuery } from "@apollo/client";

const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      id
      name
      email
      cart {
        id
        price
        products {
          id
          quantity
          product {
            id
            name
            description
            price
            photo
          }
        }
      }
      shipping {
        id
        line1
        line2
        city
        state
        country
        zip
      }
    }
  }
`

export const useGetAllUsers = () => {
    var {loading, data, error} = useQuery(GET_ALL_USERS)
     data = data?.allUsers
    return { loading, data, error}
}