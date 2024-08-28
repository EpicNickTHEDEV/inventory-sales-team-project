import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell, sendAlert } from "@hubspot/ui-extensions";

// Define the extension to be run within the HubSpot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

const Extension = ({ context, runServerless, sendAlert }) => {
  const [text, setText] = useState("");
  const fallbackLocal = 'Home';
  const fallbackVertical = 'Mercado';
  const fallbackProduto = 'Banner';
  const fallbackTipo = 'Regular';
  const fallbackDescricao = 'Lorem ipsum dolor conecster amett adhet';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await runServerless({ parameters: {} });
        
        // Debugging: Check the structure of the result
        console.log("Serverless result:", result);
        
        // Parsing the result safely
        let availabilityItems = [];
        if (result && typeof result === 'string') {
          availabilityItems = JSON.parse(result);
        } else {
          sendAlert("error", "Unexpected data format returned from serverless function");
        }
        
        if (Array.isArray(availabilityItems)) {
          setData(availabilityItems);
        } else {
          sendAlert("error", "Data is not an array");
        }
        
      } catch (error) {
        sendAlert("error", "Failed to fetch data from serverless function");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [runServerless, sendAlert]);

  if (loading) {
    return <p>Loading...</p>;
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
        <TableRow>
          <TableCell>{fallbackLocal}</TableCell>
          <TableCell>{fallbackVertical}</TableCell>
          <TableCell>{fallbackProduto}</TableCell>
          <TableCell>{fallbackTipo}</TableCell>
          <TableCell>{fallbackDescricao}</TableCell>
        </TableRow>
        {Array.isArray(data) && data.length > 0 && data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.location?.name || fallbackLocal}</TableCell>
            <TableCell>{item.vertical?.name || fallbackVertical}</TableCell>
            <TableCell>{item.product?.name || fallbackProduto}</TableCell>
            <TableCell>{item.quantity || 'N/A'}</TableCell>
            <TableCell>{item.startDate || 'N/A'}</TableCell>
            <TableCell>{item.endDate || 'N/A'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
