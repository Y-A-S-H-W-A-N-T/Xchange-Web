import "@/styles/globals.css"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../components/redux/store'
import { ApolloProvider } from "@apollo/client"
import client from "@/components/grapql/apolloserver";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}
