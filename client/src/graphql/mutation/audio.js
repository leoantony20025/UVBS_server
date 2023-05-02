import { gql, useMutation } from "@apollo/client";

const ADD_AUDIO = gql`
  mutation AddAudio($title: String!, $description: String!, $thumbnail: String!, $audioUrl: String!, $language: String!, $song: Boolean!) {
    addAudio(title: $title, description: $description, thumbnail: $thumbnail, audioUrl: $audioUrl, language: $language, song: $song) {
      id
      title
      description
      thumbnail
      audioUrl
      language
      song
      createdAt
      updatedAt
    }
  }
`

export const useAddAudio = () => {
    var [addAudio, {loading, data, error}] = useMutation(ADD_AUDIO)

    return { addAudio, loading, data, error}
}

const UPDATE_AUDIO = gql`
  mutation UpdateAudio($id: String!, $title: String!, $description: String!, $thumbnail: String!, $audioUrl: String!, $language: String!, $song: Boolean!) {
    updateAudio(id: $id, title: $title, description: $description, thumbnail: $thumbnail, audioUrl: $audioUrl, language: $language, song: $song) {
      id
      title
      description
      thumbnail
      audioUrl
      language
      song
      createdAt
      updatedAt
    }
  }
`

export const useUpdateAudio = () => {
    var [updateAudio, {loading, data, error}] = useMutation(UPDATE_AUDIO)

    return { updateAudio, loading, data, error}
}

const DELETE_AUDIO = gql`
  mutation DeleteAudio($id: String!) {
    deleteAudio(id: $id) {
      id
      title
      description
      thumbnail
      audioUrl
      language
      song
      createdAt
      updatedAt
    }
  }
`

export const useDeleteAudio = () => {
    var [deleteAudio, {loading, data, error}] = useMutation(DELETE_AUDIO)

    return { deleteAudio, loading, data, error}
}