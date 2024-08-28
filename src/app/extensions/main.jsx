import React, { useState } from "react";
import { Button, Text, Flex, Tag, hubspot, LoadingSpinner, TableBody, TableCell, TableHead, TableRow, TableHeader, Table, Heading, Link, Modal, ModalBody } from "@hubspot/ui-extensions";

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

  // Call serverless function to execute with parameters.
  // The `myFunc` function name is configured inside `serverless.json`
  const handleClick = async () => {
    const { response } = await runServerless({ name: "myFunc", parameters: { text: text } });
    sendAlert({ message: response });
  };

  return (
    <>
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          This is the inventory engine front-end made by Epic Digital.
        </Text>
        Hi, {context.user.firstName}, this is under development and will be available soon to the iFood Sales Team, please wait a little longer :)
      </Text>
      <Flex direction="row" align="end" gap="small">
        <Input name="text" label="Send" onInput={(t) => setText(t)} />
        <Button type="submit" onClick={handleClick}>
          Debug me
        </Button>
      </Flex>
      <Divider />
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
            <TableCell>{ 'Home' }</TableCell>
            <TableCell>{'Banner'}</TableCell>
            <TableCell>{'Regular'}</TableCell>
            <TableCell>{ 'Lorem ipsum dolor conecster amett adhet' }</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </>
  );
};
