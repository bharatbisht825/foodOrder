import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
      const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email,password)
    try {
      const response = await fetch('https://foodorder-production-7583.up.railway.app/login', {
        method: 'POST',
        credentials: 'include', // important to send cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard")

      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.log('Login error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
         <button
         onClick={()=>navigate("/signup")}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >Sign Up</button>
      </form>
    </div>
  );
}

export default Login;
