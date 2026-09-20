import LoginButton from '../../components/auth/LoginButton';

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default SignIn;