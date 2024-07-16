import { gql } from '@apollo/client';

const GET_NEWS = gql`
  {
    getNews {
      id
      headline
      description
      image
    }
  }
`
const ADD_NEWS = gql`
  mutation addNews($headline: String, $description: String, $image: String) {
    addNews(headline: $headline, description: $description, image: $image) {
      id
      headline
      description
      image
    }
  }
`
  

// const REMOVE_BOOK = gql`
//   mutation REMOVEBOOK($bookId: ID!) {
//     deleteBook(id: $bookId) {
//       author
//     }
//   }
// `

// const UPDATE_BOOK = gql`
//   mutation updateBook($bookId: ID, $books: String, $copies: String) {
//     updateBook(id: $bookId, books: $books, copies: $copies) {
//       id
//       author
//       copies
//       books
//     }
//   }
// `


export { GET_NEWS, ADD_NEWS }
