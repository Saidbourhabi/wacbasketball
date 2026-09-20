import { useAuth0 } from '@auth0/auth0-react';
import { notify } from '../../lib/toast';

const LogoutButton = ({ className = '' }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    notify.success('Signing you out…');
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <button onClick={handleLogout} className={`w-full text-left ${className}`}>
      Log Out
    </button>
  );
};

export default LogoutButton;