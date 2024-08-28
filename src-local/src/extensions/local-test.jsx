import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios directly

const LocalTest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://ifood-availability-backend-production-ifood.svc-us3.zcloud.ws/graphql", {
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
          `,
        });

        const availabilityItems = response.data.data.availabilityItems;

        if (Array.isArray(availabilityItems)) {
          setData(availabilityItems);
        } else {
          throw new Error("Expected an array but did not get one.");
        }
      } catch (error) {
        setError(error.message || "An unexpected error occurred");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              <td>{item.location?.name || "Home"}</td>
              <td>{item.vertical?.name || "Mercado"}</td>
              <td>{item.product?.name || "Banner"}</td>
              <td>{item.quantity || "Regular"}</td>
              <td>{item.startDate || "N/A"}</td>
              <td>{item.endDate || "N/A"}</td>
            </tr>
          ))
        ) : (
          fallbackRow
        )}
      </tbody>
    </table>
  );
};

export default LocalTest;
