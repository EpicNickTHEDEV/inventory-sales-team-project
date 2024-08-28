import React, { useState } from "react";
import { Button, Text, Flex, Tag, hubspot, LoadingSpinner, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Heading, Link, Modal, ModalBody } from "@hubspot/ui-extensions";
import axios from 'axios';

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
  const fallbackVertical = 'Banner';
  const fallbackProduto = 'Regular';
  const fallbackDescricao = 'Lorem ipsum dolor conecster amett adhet';

  return (
    <>
      <Table 
        bordered={true}
        paginated={true}
        pageCount="5"
      >
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
            <TableCell>{ fallbackVertical }</TableCell>
            <TableCell>{ fallbackProduto }</TableCell>
            <TableCell>{ fallbackDescricao }</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </>
  );
};
