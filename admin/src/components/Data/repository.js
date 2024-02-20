import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Owner ---------------------------------------------------------------------------------------
async function getReviews() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_reviews {
        reivewID
        text
        rating
        userID
        username
        movieID
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_reviews;
}
export { getReviews };
