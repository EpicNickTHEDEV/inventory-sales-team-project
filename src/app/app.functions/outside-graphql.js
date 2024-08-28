const axios = require("axios");

exports.main = async (context = {}) => {
  try {
    // Fetch associated availability items
    const { data } = await fetchAvailabilityItems();
    console.log(`data: ${SON.stringify(data.toString())}`);

    // Send the response data
    return data;
  } catch (e) {
    // Handle and return the error
    return e;
  }
};

const fetchAvailabilityItems = () => {
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

  // Return the axios post
  return axios.post(
    "https://ifood-availability-backend-production-ifood.svc-us3.zcloud.ws/graphql",
    JSON.stringify(body),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
