import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { notify } from '../lib/toast';

const MESSAGES = {
  login_required:   'Please sign in to continue.',
  consent_required: 'Additional permissions are required.',
  access_denied:    'Access denied.',
  invalid_grant:    'Your session expired. Please sign in again.',
  timeout:          'Authentication timed out. Please try again.',
};

export function useAuthError() {
  const { error } = useAuth0();

  useEffect(() => {
    if (!error) return;
    console.error('[Auth0]', error);
    const msg = MESSAGES[error.error] || error.message || 'Authentication error.';
    notify.error(msg);
  }, [error]);
}