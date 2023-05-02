import { gql, useQuery } from "@apollo/client";

const GET_ALL_AUDIOS = gql`
  query AllAudios {
    allAudios {
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

export const useGetAllAudios = () => {
    var {loading, data, error} = useQuery(GET_ALL_AUDIOS)
    data = data?.allAudios
    return { loading, data, error}
}