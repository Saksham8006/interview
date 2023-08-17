import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');



  const handleLogin = async (e) => {
    e.preventDefault();

    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        const res = await fetch('http://localhost:3002/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (res.ok) {
          const responseData = await res.json();
          console.log('User Login Successfully', responseData);
    
          localStorage.setItem('token', responseData.user);
          console.log(responseData.user) // Store the token in localStorage
    
          navigate("/");
    
        } else {
          setError('Invalid credentials');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
  
  }


  return (
    <div>
      <html className="min-h-screen ">
        <body className=" bg-gray-100 min-h-screen flex h-full items-center py-16">
          <main className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm ">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 ">Sign in</h1>
                  <p className="mt-2 text-sm text-gray-600 ">
                    Don't have an account yet?
                    <Link className="text-blue-600 decoration-2 hover:underline font-medium" to="/register">
                      Sign up here
                    </Link>
                  </p>
                </div>

                <div className="mt-5">


                  <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 ">Or</div>

                  <form onSubmit={handleLogin}>
                    <div className="grid gap-y-4">

                      <div>
                        <label for="email" className="block text-sm mt-[5px]">Email address</label>
                        <div className="relative">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" name="email" className={`py-3 px-4 block w-full  rounded-md text-sm border border-blue-500 focus:ring-blue-500  ${emailError ? 'input-error' : ''}`} required aria-describedby="email-error" />
                          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}

                          <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                            <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include Link valid email address so we can get back to you</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center">
                          <label for="password" className="block text-sm mt-[5px]">Password</label>
                          {/* <Link className="text-sm text-blue-600 decoration-2 hover:underline font-medium" to="../examples/html/recover-account.html">Forgot password?</Link> */}
                        </div>
                        <div className="relative">
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="pass
                            word" id="password" name="password" className={`py-3 px-4 block w-full rounded-md text-sm border border-blue-500 focus:ring-blue-500  ${passwordError ? 'input-error' : ''}`} required aria-describedby="password-error" />
                          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}

                          <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                            <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                      </div>

                      <div className="flex items-center">
                        <div className="flex">
                          <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500" />
                        </div>
                        <div className="ml-3">
                          <label for="remember-me" className="text-sm ">Remember me</label>
                        </div>
                      </div>


                      <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">Sign in</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </main>
        </body>
      </html>
    </div>
  )
}

export default Login