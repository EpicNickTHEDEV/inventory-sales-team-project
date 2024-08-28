const axios = require("axios");

exports.main = async (context = {}) => {
  try {
    // Fetch associated availability items
    const { data } = await fetchAvailabilityItems();

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

  console.log(`initial body all: ${JSON.stringify(body)}`);
  const dataPost = axios.post(
    "https://ifood-availability-backend-production-ifood.svc-us3.zcloud.ws/graphql",
    JSON.stringify(body),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(`dataPost final body all: ${dataPost} ${dataPost.response}`);

  return dataPost;
};
