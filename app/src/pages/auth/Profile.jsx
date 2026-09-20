import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../../components/auth/LogoutButton';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#fc0000] border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div className="text-center p-4">Please log in to view your profile.</div>;
  }

  // Namespaced custom claim — only present if you set it via an Auth0 Action
  const phone = user?.['https://yourdomain.com/phone'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

        <div className="flex flex-col items-center mb-6">
          {user?.picture && (
            <img
              src={user.picture}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full mb-4"
            />
          )}
          <h2 className="text-xl uppercase font-semibold text-[#fc0000]">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-[#fc0000]">Full Name</h3>
            <p className="text-gray-600">{user.name}</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#fc0000]">Your Email</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
          {phone && (
            <div>
              <h3 className="font-semibold text-[#fc0000]">Phone Number</h3>
              <p className="text-gray-600">{phone}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <LogoutButton className="bg-black text-white px-4 py-2 rounded-lg hover:bg-red-700 transition" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;