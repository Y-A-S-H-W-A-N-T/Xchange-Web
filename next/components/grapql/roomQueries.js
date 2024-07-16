import { gql } from '@apollo/client';

const GET_ROOMS = gql`
  {
    getRooms {
      id
      name
      private
      passcode
      chats {
        id
        sender_vtu
        media
        message
      }
    }
  }
`

const ADD_ROOM = gql`
    mutation AddRoom($input: roomInput) {
        addRoom(input: $input) {
            id
            name
            passcode
            private
            chats {
                id
                media
                message
                sender_vtu
            }
        }
    }
`
// const ADD_NEWS = gql`
//   mutation addNews($headline: String, $description: String, $image: String) {
//     addNews(headline: $headline, description: $description, image: $image) {
//       id
//       headline
//       description
//       image
//     }
//   }
// `

export { GET_ROOMS, ADD_ROOM }
