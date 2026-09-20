import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { notify } from '../lib/toast';

export function useAuthenticatedUser() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadToken = async () => {
      if (!isAuthenticated || isLoading) {
        if (!cancelled) {
          setAccessToken(null);
          setTokenLoading(false);
        }
        return;
      }

      if (!cancelled) setTokenLoading(true);

      try {
        const token = await getAccessTokenSilently();
        if (!cancelled) setAccessToken(token);
      } catch (err) {
        if (cancelled) return;
        const code = err?.error || err?.name || 'unknown';
        console.warn('[Auth0] silent token failed:', code);

        setAccessToken(null);

        // Only notify on hard failures — soft ones are handled by the SDK
        const soft = ['login_required', 'consent_required', 'timeout'];
        if (!soft.includes(code)) {
          notify.error('Could not retrieve your session. Please sign in again.');
        }
      } finally {
        if (!cancelled) setTokenLoading(false);
      }
    };

    loadToken();
    return () => { cancelled = true; };
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading: isLoading || tokenLoading,
  };
}