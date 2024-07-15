import "@/styles/globals.css";
import { Provider } from 'react-redux';
import { store } from '../components/redux/store'
import { ApolloProvider } from "@apollo/client"
import client from "@/components/grapql/apolloserver";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  )
}
