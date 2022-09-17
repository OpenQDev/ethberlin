import '../styles/globals.css';
import StoreProvider from '../store/Store/StoreProvider';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

function MyApp({ Component }) {
  function getLibrary(provider) {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }

  return (
    <StoreProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component />
      </Web3ReactProvider>
    </StoreProvider>
  );
};

export default MyApp;
