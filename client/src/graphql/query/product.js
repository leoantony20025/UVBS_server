import { gql, useQuery } from "@apollo/client";

const GET_ALL_PRODUCTS = gql`
  query AllProducts {
    allProducts {
      id
      name
      description
      photo
      price
      stock
      createdAt
      updatedAt
    }
  }
`

export const useGetAllProducts = () => {
    var {loading, data, error} = useQuery(GET_ALL_PRODUCTS)
    data = data?.allProducts
    return { loading, data, error}
}