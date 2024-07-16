import { gql } from "apollo-server-express"

const typeDefs = gql`

    type news{
        id: ID,
        headline: String,
        description: String,
        image: String
    }

    type chats{
        id: ID,
        sender_vtu: String,
        media: String,
        message: String
    }

    type room{
        id: ID,
        name: String,
        private: Boolean,
        passcode: String
        chats: [chats]
    }

    type members{
        id: ID,
        user_vtu: String
    }

    type post_comments{
        id: ID,
        sender_vtu: String,
        comment: String
    }

    type posts{
        id: ID
        post_title: String,
        post_media: String
        post_comments: [post_comments]
    }

    type community{
        id: ID,
        leader_vtu: String,
        name: String,
        description: String,
        members: [members],
        posts: [posts]
    }

    type Query{
        getNews: [news]
        getRooms: [room]
        getCommunities: [community]
    }
    
    
    input chatInput{
        sender_vtu: String,
        media: String,
        message: String
    }

    input roomInput{
        name: String,
        private: Boolean,
        passcode: String,
    }

    type Mutation{
        addNews(headline: String, description: String, image: String): news
        updateNews(id: ID, headline: String, description: String, image: String): news
        deleteNews(id: ID): news

        addRoom(input: roomInput): room
        addChatToRoom(id: ID, input: chatInput): room
    }
`

export default typeDefs