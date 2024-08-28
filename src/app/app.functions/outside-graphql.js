import { gql } from "@apollo/client";

// Define the GraphQL query
export const AVAILABILITY_ITEMS_QUERY = gql`
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
