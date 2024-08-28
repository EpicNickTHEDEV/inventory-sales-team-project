const axios = require("axios");

exports.main = async (context = {}) => {
  const fallbackData = [
    {
      location: { name: "Home" },
      vertical: { name: "Mercado" },
      product: { name: "Banner" },
      quantity: 0,
      startDate: "N/A",
      endDate: "N/A",
      type: "Regular",
      descricao: "Lorem ipsum dolor conecster amett adhet",
    },
  ];

  try {
    const response = await axios.post("http://localhost:3000/graphql", {
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

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.data.availabilityItems),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 200,
      body: JSON.stringify(fallbackData),
    };
  }
};
