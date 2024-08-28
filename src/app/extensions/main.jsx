import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Text, Flex, Input, Divider, LoadingSpinner } from "@hubspot/ui-extensions";
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/graphql', {
          query: `
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
          `
        });
        setData(response.data.data.availabilityItems);
        setLoading(false);
      } catch (error) {
        sendAlert("error", "Failed to fetch data from GraphQL API");
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sendAlert]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          This is the inventory engine front-end made by Epic Digital.
        </Text>
        Hi, {context.user.firstName}, this is under development and will be available soon to the iFood Sales Team, please wait a little longer
      </Text>
      <Flex direction="row" align="end" gap="small">
        <Input name="text" label="Send" onInput={(t) => setText(t)} />
      </Flex>
      <Divider />
      <Table bordered={true} paginated={true} pageCount="5">
        <TableHead>
          <TableRow>
            <TableHeader>LOCAL</TableHeader>
            <TableHeader>VERTICAL</TableHeader>
            <TableHeader>PRODUTO</TableHeader>
            <TableHeader>QUANTIDADE</TableHeader>
            <TableHeader>INÍCIO</TableHeader>
            <TableHeader>FIM</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
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
