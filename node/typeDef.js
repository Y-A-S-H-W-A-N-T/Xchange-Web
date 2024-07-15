import { gql } from "apollo-server-express"

const typeDefs = gql`

    type news{
        id: ID,
        headline: String,
        description: String,
        image: String
    }

    type Query{
        getNews: [news]
    }

    type Mutation{
        addNews(headline: String, description: String, image: String): news
        updateNews(id: ID, headline: String, description: String, image: String): news
        deleteNews(id: ID): news
    }
`

export default typeDefs