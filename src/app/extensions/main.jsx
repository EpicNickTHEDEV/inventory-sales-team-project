import React, { useEffect, useState } from "react";
import { logger, Button, Text, Flex, Tag, Heading, Link, LoadingSpinner, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, hubspot } from "@hubspot/ui-extensions";

hubspot.extend(({ context, runServerlessFunction, actions }) => 
  <Extension 
    context={context} 
    runServerless={runServerlessFunction}
  />
);

const Extension = ({ context, runServerless, actions }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await runServerless({
          name: "fetchAvailabilityItems",
        });

        if (result.status === "SUCCESS" && result.response) {
          logger.info("Data fetched successfully:", result.response.data);
          setData(result.response.data);
        } else {
          throw new Error("Failed to fetch data from serverless function");
        }
      } catch (e) {
        logger.error("Error in fetchData:", e);
        setError(e.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [runServerless]);

  if (loading) return <LoadingSpinner label="Carregando..." />;
  if (error) {
    return <p>Error: {error}</p>;
  }

  const availabilityItems = data?.availabilityItems || [];

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
        {availabilityItems.length > 0 ? (
          availabilityItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.location?.name || "Home"}</TableCell>
              <TableCell>{item.vertical?.name || "Mercado"}</TableCell>
              <TableCell>{item.product?.name || "Banner"}</TableCell>
              <TableCell>{item.quantity || "Regular"}</TableCell>
              <TableCell>{new Date(parseInt(item.startDate)).toLocaleDateString() || "N/A"}</TableCell>
              <TableCell>{new Date(parseInt(item.endDate)).toLocaleDateString() || "N/A"}</TableCell>
              <TableCell><Button
   onClick={() => {
    console.log('Consultar!');
    }}
   href={{
    url: '#',
    external: true
    }}
   variant="primary"
   size="md"
   type="button"
   >
   Consultar
  </Button></TableCell>
            </TableRow>
          ))
        ) : (
          fallbackRow
        )}
      </TableBody>
    </Table>
  );
};
