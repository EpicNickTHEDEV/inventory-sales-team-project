import React from "react";
import { useQuery, gql } from "@apollo/client";

const AVAILABILITY_ITEMS_QUERY = gql`
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

const LocalTest = () => {
  // Use Apollo's useQuery hook to execute the query
  const { loading, error, data } = useQuery(AVAILABILITY_ITEMS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const fallbackRow = (
    <tr>
      <td>Home</td>
      <td>Mercado</td>
      <td>Banner</td>
      <td>Regular</td>
      <td>Lorem ipsum dolor conecster amett adhet</td>
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>LOCAL</th>
          <th>VERTICAL</th>
          <th>PRODUTO</th>
          <th>TIPO</th>
          <th>DESCRIÇÃO</th>
        </tr>
      </thead>
      <tbody>
        {data && data.availabilityItems.length > 0
          ? data.availabilityItems.map((item, index) => (
              <tr key={index}>
                <td>{item.location?.name || "Home"}</td>
                <td>{item.vertical?.name || "Mercado"}</td>
                <td>{item.product?.name || "Banner"}</td>
                <td>{item.quantity || "Regular"}</td>
                <td>{item.startDate || "N/A"}</td>
                <td>{item.endDate || "N/A"}</td>
              </tr>
            ))
          : fallbackRow}
      </tbody>
    </table>
  );
};

export default LocalTest;
