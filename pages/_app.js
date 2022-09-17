import '../styles/globals.css';
import StoreProvider from '../store/Store/StoreProvider';
import AuthProvider from '../store/AuthStore/AuthProvider';
import AuthButton from '../components/Authentication/AuthButton';

function MyApp({ Component }) {
  return (
    <AuthProvider>
      <StoreProvider>
        <Component />
      </StoreProvider>
    </AuthProvider>
  );
};

export default MyApp;
