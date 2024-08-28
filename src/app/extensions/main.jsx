import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from "@apollo/client";
import { logger, LoadingSpinner, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, hubspot } from "@hubspot/ui-extensions";
import { AVAILABILITY_ITEMS_QUERY } from "../app.functions/outside-graphql";

const client = new ApolloClient({ 
  uri: "https://ifood-availability-backend-production-ifood.svc-us3.zcloud.ws/graphql",
  cache: new InMemoryCache(),
});

hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <ApolloProvider client={client}>
    <Extension
      context={context}
      runServerless={runServerlessFunction}
      sendAlert={actions.addAlert}
    />
  </ApolloProvider>
));


const Extension = ({ context, runServerless, sendAlert }) => {
  const { loading, error, data } = useQuery(AVAILABILITY_ITEMS_QUERY);

  if (loading) return <LoadingSpinner label="Carregando..." />;
  if (error) {
    logger.error("Error in fetchData:", error);
    logger.error("error", error.message || "An unexpected error occurred");
    return <p>Error: {error.message}</p>;
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
