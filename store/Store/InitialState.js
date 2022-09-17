import AuthService from '../../services/auth/AuthService';
import GithubRepository from '../../services/github/GithubRepository';

let InitialState = {};
switch (process.env.NEXT_PUBLIC_DEPLOY_ENV) {
  case 'docker':
    InitialState = {
      authService: new AuthService(),
      githubRepository: new GithubRepository()
    };
    break;
  case 'production':
    InitialState = {
      authService: new AuthService(),
      githubRepository: new GithubRepository()
    };
    break;
  default:
    throw Error('ENVIRONMENT NOT CONFIGURED CORRECTLY. Set an environment with DEPLOY_ENV');
}

export default InitialState;
