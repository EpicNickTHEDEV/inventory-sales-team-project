import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import { logger, LoadingSpinner, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, hubspot } from "@hubspot/ui-extensions";

// Define the GraphQL query directly in the JSX file
const AVAILABILITY_ITEMS_QUERY = gql`
  query {
    availabilityItems {
      _id
      product {
        name
      }
      location {
        name
      }
      vertical {
        name
      }
      quantity
      startDate
      endDate
    }
  }
`;

// Set up the Apollo Client
const client = new ApolloClient({ 
  uri: "https://ifood-availability-backend-production-ifood.svc-us3.zcloud.ws/graphql",
  cache: new InMemoryCache(),
});

// Define the extension to be run within the HubSpot CRM
hubspot.extend(({ context, actions }) => (
  <ApolloProvider client={client}>
    <Extension
      context={context}
      sendAlert={actions.addAlert}
    />
  </ApolloProvider>
));

const Extension = ({ context, runServerless, sendAlert }) => {
  const { loading, error, data } = useQuery(AVAILABILITY_ITEMS_QUERY);

  if (loading) return <LoadingSpinner label="Carregando..." />;
  if (error) {
    logger.error("Error in fetchData:", error);
    return;
  }

  const fallbackRow = (
    <TableRow>
      <TableCell>Home</TableCell>
      <TableCell>Mercado</TableCell>
      <TableCell>Banner</TableCell>
      <TableCell>Regular</TableCell>
      <TableCell>Lorem ipsum dolor conecster amett adhet</TableCell>
    </TableRow>
  );

  return (
    <Table bordered={true} paginated={true} pageCount="5">
      <TableHead>
        <TableRow>
          <TableHeader>LOCAL</TableHeader>
          <TableHeader>VERTICAL</TableHeader>
          <TableHeader>PRODUTO</TableHeader>
          <TableHeader>TIPO</TableHeader>
          <TableHeader>DESCRIÇÃO</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data && data.availabilityItems.length > 0 ? (
          data.availabilityItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.location?.name || "Home"}</TableCell>
              <TableCell>{item.vertical?.name || "Mercado"}</TableCell>
              <TableCell>{item.product?.name || "Banner"}</TableCell>
              <TableCell>{item.quantity || "Regular"}</TableCell>
              <TableCell>{item.startDate || "N/A"}</TableCell>
              <TableCell>{item.endDate || "N/A"}</TableCell>
            </TableRow>
          ))
        ) : (
          fallbackRow
        )}
      </TableBody>
    </Table>
  );
};
