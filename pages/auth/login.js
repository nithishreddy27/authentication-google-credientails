// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession,signOut, getSession } from 'next-auth/react';
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('')
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("e",email,password);
    // Use NextAuth.js signIn to authenticate the user
    const result = await signIn('credentials', {
      redirect: false, // Prevent NextAuth.js from automatically redirecting
      username,
      password,
    });

    if (result?.error) {
      console.error('Login error:', result.error);
      return;
    }

    console.log(result);
    if(!result?.user){
        seterror("Invalid username and password")
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6 mb-5" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="Username"
                type="email"
                autoComplete="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Add "remember me" checkbox if needed */}
            </div>

            <div className="text-sm">
              {/* Add "Forgot your password?" link if needed */}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>

          </div>

          <button
              onClick={() => signIn("google")}
              className="bg-green-600 text-white rounded p-2 "
            >
              Sign in google
            </button>
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white rounded p-2 mx-10 "
            >
              Sign out
            </button>      </form>
      <Link href="/auth/signup" className='underline'> New user ? Sign Up</Link>
      
      <div>User : {JSON.stringify(session)}</div>
      </div>
    </div>
  );
};

export default LoginPage;


export async function getServerSideProps(context) {
    // Fetch data from external API
    const r =  await getSession(context)
    console.log("inside server",r)
    return { props: {  } }
  }