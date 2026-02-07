// 'use client';

// import { useRouter } from 'next/navigation'; 

// export default function LoginPage() {  // <--- THIS LINE IS REQUIRED
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     router.push('/');
//   };

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold">Login Page</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
//         <input type="email" placeholder="Email" className="border p-2" required />
//         <input type="password" placeholder="Password" className="border p-2" required />
//         <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
//       </form>
//     </div>
//   );
// }



'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Call the Login API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        
        alert("Login Successful!");

        // CRITICAL: Save the user ID so the Cart knows who you are
        if (data.user && data.user.id) {
            localStorage.setItem('userId', data.user.id);
        }
        
        router.push('/Profile');
      } else {
        // Show error message from API
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              required 
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password" 
              required 
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
