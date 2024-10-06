import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface LoginInput {
  email: string;
  password: string;
}

export default function Login() {
  const [input, setInput] = useState<LoginInput>({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setMessage(data.message);
      } else {
        setMessage(data.error || 'An error occurred');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      animate={{
        background: [
          'linear-gradient(to right, #4a1d96, #5b21b6, #1e40af)',
          'linear-gradient(to right, #5b21b6, #1e40af, #4a1d96)',
          'linear-gradient(to right, #1e40af, #4a1d96, #5b21b6)',
        ],
      }}
      transition={{
        duration: 10,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Log in to your account</h2>
        </div>
        <motion.div 
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 py-5 sm:p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-800 text-white sm:text-sm"
                    value={input.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-800 text-white sm:text-sm"
                    value={input.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Log in
                </motion.button>
              </div>
            </form>

            {message && (
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-md bg-purple-900 bg-opacity-50 p-4">
                  <div className="flex">
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-purple-200">{message}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        <div className="text-center">
          <motion.a 
            href="/signup" 
            className="font-medium text-purple-300 hover:text-purple-200 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
          >
            Don't have an account? Sign up
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}