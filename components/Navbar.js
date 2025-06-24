"use client";

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-bold">
          Movie Discovery
        </Link>
        <div className="flex space-x-4">
          <Link href="/watchlist" className="text-gray-300 hover:text-white">
            My Watchlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
