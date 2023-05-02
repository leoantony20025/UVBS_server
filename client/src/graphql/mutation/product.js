import { gql, useMutation } from "@apollo/client";

const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $description: String!, $photo: String!, $price: Int!, $stock: Int!) {
    addProduct(name: $name, description: $description, photo: $photo, price: $price, stock: $stock) {
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

export const useAddProduct = () => {
    var [addProduct, {loading, data, error}] = useMutation(ADD_PRODUCT)

    return { addProduct, loading, data, error}
}

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: String!, $name: String!, $description: String!, $photo: String!, $price: Int!, $stock: Int!) {
    updateProduct(id: $id, name: $name, description: $description, photo: $photo, price: $price, stock: $stock) {
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

export const useUpdateProduct = () => {
    var [updateProduct, {loading, data, error}] = useMutation(UPDATE_PRODUCT)

    return { updateProduct, loading, data, error}
}

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id) {
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

export const useDeleteProduct = () => {
    var [deleteProduct, {loading, data, error}] = useMutation(DELETE_PRODUCT)

    return { deleteProduct, loading, data, error}
}