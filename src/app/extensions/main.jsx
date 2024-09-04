import React, { useEffect, useState } from "react";
import { logger, Button, Text, Modal, ModalBody, Flex, Tag, Heading, Link, LoadingSpinner, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, hubspot } from "@hubspot/ui-extensions";

// TODO:
// 1 -> Open iFrame inside modal (https://developers.hubspot.com/docs/platform/ui-extensions-sdk#open-an-iframe-in-a-modal)
// 2 -> Add calendar to the modal
// 3 -> Add editing panel
// 4 -> Improve GraphQL handling and mutations...

hubspot.extend(({ context, runServerlessFunction, actions }) => 
  <Extension 
    context={context} 
    runServerless={runServerlessFunction}
    openIframe={actions.openIframeModal}
  />
);

const Extension = ({ context, runServerless, actions, openIframe }) => {

  const handleIFRAME = () => {
    openIframe({
      uri: "https://nzo8gje8hiijq-ifood.svc-us3.zcloud.ws/",
      height: 1030,
      width: 1200,
      title: 'Escolha sua reserva',
      flush: true
    }, () => console.log('iFrame called... Loading from modal!'));
  };

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
    <Table bordered={true} paginated={false} pageCount="1">
      <TableHead>
        <TableRow>
          <TableHeader width={'min'}>LOCAL</TableHeader>
          <TableHeader width={'min'}>VERTICAL</TableHeader>
          <TableHeader width={'min'}>PRODUTO</TableHeader>
          <TableHeader width={'min'}>TIPO</TableHeader>
          <TableHeader width={'min'}>DESCRIÇÃO</TableHeader>
          <TableHeader width={'min'}>AÇÃO</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {availabilityItems.length > 0 ? (
          availabilityItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell width={'min'}>{item.location?.name || "Home"}</TableCell>
              <TableCell width={'min'}>{item.vertical?.name || "Mercado"}</TableCell>
              <TableCell width={'min'}>{item.product?.name || "Banner"}</TableCell>
              <TableCell width={'min'}>{item.type || "Regular"}</TableCell>
              <TableCell width={'min'}>{item.description || "Lorem ipsum dolor conecster amett adhet"}</TableCell>
              <TableCell width={'min'}><Button
   onClick={() => {
    console.log('Consultar!');
    }}
   href={{
    url: '#',
    external: false
    }}
   variant="primary"
   size="sm"
                type="button"
                overlay={
                  <Modal 
                  id="consultar-modal" 
                  title="Consultar Disponibilidade"
                  width="md"
                  >
                    <ModalBody>
                      <Text>Consultar Disponibilidade</Text>
                      <Text>Carregando disponibilidades...</Text>
                      <Text>Faça a reserva abaixo:</Text>
                      <Button type="submit" onClick={handleIFRAME}>Fazer Reserva</Button>
                    </ModalBody>
                  </Modal>
                }
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
