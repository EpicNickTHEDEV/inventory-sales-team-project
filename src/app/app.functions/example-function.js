const axios = require("axios");

exports.main = async (context = {}) => {
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

    // Return the fetched data
    return {
      statusCode: 200,
      body: JSON.stringify(response.data.data.availabilityItems),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from GraphQL API" }),
    };
  }
};
