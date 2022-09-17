import '../styles/globals.css';
import StoreProvider from '../store/Store/StoreProvider';

function MyApp({ Component }) {
  return (
    <StoreProvider>
      <Component />
    </StoreProvider>
  );
};

export default MyApp;
