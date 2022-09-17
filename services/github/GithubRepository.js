import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import {
  GET_PULL_REQUEST
} from './graphql/query';
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context';

class GithubRepository {
  constructor() { }

  httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    fetch,
  });

  authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAT}`,
      },
    };
  });

  client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    link: this.authLink.concat(this.httpLink),
    cache: new InMemoryCache(),
  });

  async getPullRequest(issueUrl) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.query({
          query: GET_PULL_REQUEST,
          variables: {
            issueUrl,
          },
        });
        resolve(result.data.resource);
      } catch (e) {
        reject(e);
      }
    });

    return promise;
  }
}

export default GithubRepository;
