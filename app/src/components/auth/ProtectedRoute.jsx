import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { notify } from '../../lib/toast';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();
  const promptedRef = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !error && !promptedRef.current) {
      promptedRef.current = true;
      notify.info('Please sign in to continue');
      loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
    }
  }, [isLoading, isAuthenticated, error, loginWithRedirect]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#fc0000] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Authentication error: {error.message}
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;