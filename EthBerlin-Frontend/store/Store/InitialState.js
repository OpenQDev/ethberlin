import GithubRepository from '../../services/github/GithubRepository';
import PinataService from '../../services/pinata/PinataService';

let InitialState = {};
switch (process.env.NEXT_PUBLIC_DEPLOY_ENV) {
  case 'docker':
    InitialState = {
      githubRepository: new GithubRepository(),
      pinataService: new PinataService()
    };
    break;
  case 'production':
    InitialState = {
      githubRepository: new GithubRepository(),
      pinataService: new PinataService()
    };
    break;
  default:
    throw Error('ENVIRONMENT NOT CONFIGURED CORRECTLY. Set an environment with DEPLOY_ENV');
}

export default InitialState;
