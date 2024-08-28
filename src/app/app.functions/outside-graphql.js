const { gql } = require("@apollo/client");
const axios = require("axios");

exports.main = async (context = {}) => {
  // Extract parameters from context, if needed
  const { hs_object_id } = context.parameters;

  try {
    // Fetch associated availability items
    const { data } = await fetchAvailabilityItems(query);

    // Send the response data
    return data;
  } catch (e) {
    // Handle and return the error
    return e;
  }
};

const fetchAvailabilityItems = (query) => {
  // Set the body for the axios call
  const body = {
    query: query.loc.source.body, // Extract the query string from gql object
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

// GraphQL query to fetch availability items
const query = gql`
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
