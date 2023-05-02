import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Login(\$email: String!, \$password: String!) {
      login(email: \$email, password: \$password) {
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

export const useLogin = () => {
    const [login, {loading, data, error}] = useMutation(LOGIN)
    return {login, loading, data, error}
}