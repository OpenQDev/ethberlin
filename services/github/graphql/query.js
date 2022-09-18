import { gql } from '@apollo/client';

export const GET_PULL_REQUEST = gql`
  query ($pullRequestId: ID!) {
    node(id: $pullRequestId) {
      ... on PullRequest {
        id
        url
        closingIssuesReferences(first: 5) {
            edges {
              node {
                id
                url
                title
              }
            }
          }
        author {
          login
        }
      }
    }
  }
`;
