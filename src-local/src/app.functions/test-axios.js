const axios = require("axios");

axios
  .post("http://localhost:3000/graphql", {
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
  })
  .then((response) => {
    console.log("Data fetched:", response.data.data.availabilityItems);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
