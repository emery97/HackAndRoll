import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo/logo.png';

interface SignInProps {
  onLogin: (token: string) => void;
}


const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      // Start loading

     // Sending login data to the backend
     const response = await fetch('http://localhost:3000/signin', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username, password }),
     });

     if (!response.ok) {
      throw new Error('Primary endpoint failed, trying alternate endpoint (For GitHub Pages)');
     }

     const data = await response.json();

     if (response.status === 200) {
       onLogin(data.token);
     } else {
       alert(data.message);
     }
   } catch (error) {
     console.error('Login error:', error);
     //alert('An error occurred while logging in.');
     try {
      // Fallback to the secondary endpoint
      const fallbackResponse = await fetch('https://enjiawu.github.io/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const fallbackData = await fallbackResponse.json();
      if (fallbackResponse.status === 200) {
        onLogin(fallbackData.token);
      } else {
        alert(fallbackData.message);
      }
    } catch (fallbackError) {
      console.error('Fallback endpoint error:', fallbackError);
      alert('Both primary and fallback endpoints failed. Please try again later.');
    }
   }
  };
    /*} else {
      // Handle form submission
      console.log('Form submitted', { username, password });
      onLogin();
    }
  };*/

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6 sm:p-12">
        <div className="mb-10 text-center">
          <Link className="inline-block w-75" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.username && (
                <span className="text-primary-500 text-sm">{errors.username}</span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.password && (
                <span className="text-primary-500 text-sm">{errors.password}</span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <Link
              to="/forgot-password"
              className="block text-sm font-medium text-primary dark:text-primary"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mb-5">
            <input
              type="submit"
              value="Continue"
              className="w-full cursor-pointer rounded-lg border mt-5 border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
            />
          </div>
        </form>
        <div className="text-center">
          <span className="text-sm text-black dark:text-white">Don't have an account? </span>
          <Link to="ocbc.com" className="text-sm font-medium text-primary dark:text-primary">
            Contact OCBC helpdesk
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
