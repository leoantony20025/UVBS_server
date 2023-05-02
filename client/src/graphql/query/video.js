import { gql, useQuery } from "@apollo/client";

const GET_ALL_VIDEOS = gql`
  query AllVideos {
    allVideos {
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

export const useGetAllVideos = () => {
    var {loading, data, error} = useQuery(GET_ALL_VIDEOS)
    data = data?.allVideos

    return { loading, data, error}
}