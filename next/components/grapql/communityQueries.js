import { gql } from '@apollo/client';

const GET_COMMUNITIES = gql`
    {
        getCommunities{
            id
            leader_vtu
            name
            description
            members {
                id
                user_vtu
            }
            posts {
                id
                post_media
                post_title
                post_comments {
                    id
                    comment
                    sender_vtu
                }
            }
        }
    }
`
const ADD_COMMUNITY = gql`
    mutation AddCommunity($input: communityInput) {
        addCommunity(input: $input) {
            id
            leader_vtu
            name
            description
            members {
                id
                user_vtu
            }
            posts {
                id
                post_media
                post_title
                post_comments {
                    id
                    comment
                    sender_vtu
                }
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

const ADD_POST = gql`
    mutation AddPostToCommunity($communityID: ID, $post: PostInput) {
        addPostToCommunity(communityID: $communityID, post: $post) {
            id
            name
            description
            leader_vtu
            posts {
                id
                post_media
                post_title
                post_comments {
                    comment
                    sender_vtu
                }
            }
            members {
                id
                user_vtu
            }
        }
    }
`

const JOIN_COMMUNITY = gql`
    mutation JoinCommunity($communityId: ID, $vtu: String) {
        joinCommunity(communityID: $communityId, vtu: $vtu) {
            id
            user_vtu
        }
    }
`


export { GET_COMMUNITIES, ADD_COMMUNITY, ADD_POST, JOIN_COMMUNITY }
