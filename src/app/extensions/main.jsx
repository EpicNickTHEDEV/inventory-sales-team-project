import React, { useState, useEffect } from "react";
import { Button, Text, Flex, Tag, hubspot, LoadingSpinner, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Heading, Link, Modal, ModalBody } from "@hubspot/ui-extensions";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {
  const [text, setText] = useState("");
  const fallbackLocal = 'Home';
  const fallbackVertical = 'Mercado';
  const fallbackProduto = 'Banner';
  const fallbackTipo = 'Regular';
  const fallbackDescricao = 'Lorem ipsum dolor conecster amett adhet';

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await runServerless({ parameters: {} });
        const availabilityItems = JSON.parse(result);
        setData(availabilityItems);
      } catch (error) {
        sendAlert("error", "Failed to fetch data from serverless function");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [runServerless, sendAlert]);

  return (
    <>
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
            <TableCell>{ fallbackLocal }</TableCell>
            <TableCell>{fallbackVertical}</TableCell>
            <TableCell>{fallbackProduto}</TableCell>
            <TableCell>{ fallbackTipo }</TableCell>
            <TableCell>{ fallbackDescricao }</TableCell>
          </TableRow>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.location.name}</TableCell>
              <TableCell>{item.vertical.name}</TableCell>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.startDate}</TableCell>
              <TableCell>{item.endDate}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    </>
  );
};
