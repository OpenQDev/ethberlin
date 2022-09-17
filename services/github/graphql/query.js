import { gql } from '@apollo/client';

export const GET_PULL_REQUEST = gql`
  query ($pullRequestId: ID!) {
    node(id: $pullRequestId) {
      ... on PullRequest {
        id
        author {
          login
        }
      }
    }
  }
`;
