import React, { useState, useEffect } from "react";
import { logger, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, hubspot } from "@hubspot/ui-extensions";

// Define the extension to be run within the HubSpot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

const Extension = ({ context, runServerless, sendAlert }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // logger.info("Initiating extension!");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await runServerless({ parameters: {} });

  //       // Debug logging to understand what 'result' contains
  //       logger.info(`Raw result: ${JSON.stringify(result)}`);

  //       if (result && result.body) {
  //         const availabilityItems = JSON.parse(result.body);

  //         if (Array.isArray(availabilityItems)) {
  //           setData(availabilityItems);
  //         } else {
  //           logger.error("Expected an array, but did not get one.");
  //           setData(null);
  //         }
  //       } else {
  //         throw new Error("Result or result.body is undefined.");
  //       }
  //     } catch (error) {
  //       setError("Failed to fetch data from serverless function");
  //       logger.error("Error in fetchData:", error);
  //       sendAlert("error", error.message || "An unexpected error occurred");
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [runServerless, sendAlert]);

  // Rendering fallback data if the fetch fails
  const fallbackRow = (
    <TableRow>
      <TableCell>Home</TableCell>
      <TableCell>Mercado</TableCell>
      <TableCell>Banner</TableCell>
      <TableCell>Regular</TableCell>
      <TableCell>Lorem ipsum dolor conecster amett adhet</TableCell>
    </TableRow>
  );

  if (error) {
    return <p>Error: {error}</p>; // Display the error message if an error occurs
  }

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
        {data && Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
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

export default Extension;
