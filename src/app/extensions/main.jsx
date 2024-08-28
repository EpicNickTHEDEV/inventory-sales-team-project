import React, { useEffect, useState } from "react";
import { logger, Button, Text, Flex, Tag, Heading, Link, LoadingSpinner, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, hubspot } from "@hubspot/ui-extensions";

import axios from "axios";

const AVAILABILITY_ITEMS_QUERY = `
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
        const response = await axios.post(
          "https://ifood-availability-backend-production-ifood.svc-us3.zcloud.ws/graphql",
          JSON.stringify({
            query: AVAILABILITY_ITEMS_QUERY,
            variables: {},
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.data) {
          setData(response.data.data);
        } else {
          throw new Error("No data returned from API");
        }
      } catch (e) {
        logger.error("Error in fetchData:", e);
        setError(e.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner label="Carregando..." />;
  if (error) {
    return <p>Error: {error}</p>;
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
