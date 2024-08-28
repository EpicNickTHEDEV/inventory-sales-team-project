const axios = require("axios");

exports.main = async (context = {}) => {
  try {
    // Fetch associated availability items
    const data = await fetchAvailabilityItems();

    // Send the response data
    return data;
  } catch (e) {
    // Handle and return the error
    console.error("Error fetching availability items:", e);
    return e;
  }
};

const fetchAvailabilityItems = async () => {
  // Define the GraphQL query as a plain string
  const query = `
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

  // Set the body for the axios call
  const body = {
    query: query,
    variables: {},
  };

  console.log(`Initial body: ${JSON.stringify(body)}`);

  try {
    const response = await axios.post(
      "https://ifood-availability-backend-production-ifood.svc-us3.zcloud.ws/graphql",
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Log the response data
    console.log(
      "DataPost response data:",
      JSON.stringify(response.data, null, 2)
    );

    return response.data;
  } catch (error) {
    console.error("Error in axios post:", error);
    throw error; // Re-throw the error so it can be caught by the caller
  }
};
