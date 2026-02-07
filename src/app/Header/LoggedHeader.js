// import Link from "next/link";
// import styles from "./header.module.css";

// export default function Header() {
//   return (
//     <header className="text-center p-4 bg-gray-200"> 
//       <h1>Welcome to E commerce Website -- "Shop Free Here" </h1>
//       <div className={`${styles.flex} p-6 font-bold text-lg`}>

//         <Link className={`${styles.link}`} href="/">SignOut</Link>
//         {/* <Link className={`${styles.link}`} href="/Login">Login</Link> */}
//       </div>
//     </header>
//   );
// }


'use client'; // Required for useState and form handling

import Link from "next/link";
import { useState } from "react";
import styles from "./header.module.css";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to Main page with the search query as a URL parameter
      // Example: http://localhost:3000/Main?search=mouse
      window.location.href = `/Main?search=${searchTerm}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-200 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4 gap-4">
        
        {/* 1. Website Title / Logo */}
        <div className="text-center md:text-left">
          <Link href="/Profile">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
              Shop Free Here
            </h1>
          </Link>
        </div>

        {/* 2. Search Bar */}   
        {/* <form onSubmit={handleSearch} className="flex w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 rounded-r-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form> */}

        {/* 3. Navigation Icons (Cart & Sign Out) */}
        <div className="flex items-center gap-6 font-bold text-gray-700 w-full md:w-auto justify-center md:justify-end">
          
          {/* Cart Link */}
          <Link href="/Cart" className="flex items-center gap-2 hover:text-blue-600 transition group">
            <div className="relative">
              {/* Shopping Cart SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {/* Optional: Badge for cart count */}
              {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span> */}
            </div>
            <span className="hidden md:inline">Cart</span>
          </Link>

          {/* Sign Out Link */}
          <Link className={`${styles.link} hover:text-red-600 transition`} href="/">
            SignOut
          </Link>
        </div>

      </div>
    </header>
  );
}