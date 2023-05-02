import { gql, useMutation } from "@apollo/client";

const ADD_VIDEO = gql`
  mutation AddVideo($title: String!, $description: String!, $thumbnail: String!, $videoUrl: String!) {
    addVideo(title: $title, description: $description, thumbnail: $thumbnail, videoUrl: $videoUrl) {
      id
      theme
      title
      description
      thumbnail
      videoUrl
      likes {
        id
        user {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      comments {
        id
        msg
        user {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`

export const useAddVideo = () => {
    var [addVideo, {loading, data, error}] = useMutation(ADD_VIDEO)

    return { addVideo, loading, data, error}
}

const UPDATE_VIDEO = gql`
  mutation UpdateVideo($id: String!, $title: String!, $description: String!, $thumbnail: String!, $videoUrl: String!) {
    updateVideo(id: $id, title: $title, description: $description, thumbnail: $thumbnail, videoUrl: $videoUrl) {
      id
      theme
      title
      description
      thumbnail
      videoUrl
      likes {
        id
        user {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      comments {
        id
        msg
        user {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`

export const useUpdateVideo = () => {
    var [updateVideo, {loading, data, error}] = useMutation(UPDATE_VIDEO)

    return { updateVideo, loading, data, error}
}

const DELETE_VIDEO = gql`
  mutation DeleteVideo($id: String!) {
    deleteVideo(id: $id) {
      id
      theme
      title
      description
      thumbnail
      videoUrl
      likes {
        id
        user {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      comments {
        id
        msg
        user {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`

export const useDeleteVideo = () => {
    var [deleteVideo, {loading, data, error}] = useMutation(DELETE_VIDEO)

    return { deleteVideo, loading, data, error}
}