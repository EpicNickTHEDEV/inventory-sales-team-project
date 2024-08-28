import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell, LoadingSpinner, hubspot } from "@hubspot/ui-extensions";

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
  const [loading, setLoading] = useState(true);

  // useEffect following HubSpot's recommended pattern
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await runServerless({ parameters: {} });

        // Assuming the response body is correctly formatted
        const availabilityItems = JSON.parse(result.body);

        setData(availabilityItems);
        setLoading(false);
      } catch (error) {
        sendAlert("error", "Failed to fetch data from serverless function");
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [runServerless, sendAlert]);

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

  // Loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner label="Loading data..." />;
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
        {/* Render fetched data or fallback */}
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
