import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LocalTest from "./extensions/local-test";

const client = new ApolloClient({
  uri: "https://ifood-availability-backend-production-ifood.svc-us3.zcloud.ws/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Local GraphQL Test</h1>
          <LocalTest />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
