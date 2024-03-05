"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const route=useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });
  
        if (response.ok) {
          route.push(`/`);
          // console.log('Registration successful!');

        } else {
           console.error('Registration failed:', await response.text());
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }

    //router.push('/');
    };

  return (
    <form className="max-w-md mx-auto flex items-center flex-col justify-center mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
