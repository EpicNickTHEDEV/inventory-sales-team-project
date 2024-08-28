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
  const result = runServerless
  logger.info(`result: ${JSON.parse(result.body)}`)

  // useEffect following HubSpot's recommended pattern
  // useEffect(() => {
  //   const fetchData = () => {
  //       const result = runServerless({ parameters: {} });
  //       const availabilityItems = JSON.parse(result.body);
  //       setData(availabilityItems);
  //   };

  //   fetchData();
  // });

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
        {(
          fallbackRow
        )}
      </TableBody>
    </Table>
  );
};
