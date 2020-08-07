import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: "https://urbane-powder-1224.us-west-2.aws.cloud.dgraph.io/graphql",
  })

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
}

ReactDOM.render(
  <ApolloProvider client={createApolloClient()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
)
