import GithubRepository from '../../services/github/GithubRepository';

let InitialState = {};
switch (process.env.NEXT_PUBLIC_DEPLOY_ENV) {
  case 'docker':
    InitialState = {
      githubRepository: new GithubRepository()
    };
    break;
  case 'production':
    InitialState = {
      githubRepository: new GithubRepository()
    };
    break;
  default:
    throw Error('ENVIRONMENT NOT CONFIGURED CORRECTLY. Set an environment with DEPLOY_ENV');
}

export default InitialState;
