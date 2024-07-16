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

    type Query{
        getNews: [news]
        getRooms: [room]
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