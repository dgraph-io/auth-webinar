import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"


const GRAPHQL_ENDPOINT = "https://possessive-peace.us-west-2.aws.cloud.dgraph.io/graphql";

const AuthorizedApolloProvider = ({ children }) => {

  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
  })

  const authLink = setContext(async (_, { headers }) => {

    return {
      headers: {
        ...headers,
        "X-Auth-Token": "",
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

ReactDOM.render(
  <AuthorizedApolloProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthorizedApolloProvider>,
  document.getElementById("root")
)
