import { gql, useQuery } from "@apollo/client";

const GET_ALL_ORDERS = gql`
  query AllOrders {
    allOrders {
      id
      price
      line1
      line2
      city
      state
      country
      zip
      status
      user {
        id
        name
        email
        phone
      }
      products {
        id
        product {
          id
          name
          description
          photo
          price
        }
      }
      createdAt
      updatedAt
    }
  }
`

export const useGetAllOrders = () => {
    var {loading, data, error} = useQuery(GET_ALL_ORDERS)
    return {loading, data, error}
}