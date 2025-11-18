'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-12 w-auto"
            >
              <Image
                src="/logo.png"
                alt="Copper State Foods"
                width={150}
                height={48}
                style={{ width: 'auto', height: '48px' }}
                className="h-12 w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/fundraising"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Fundraising
            </Link>
            <Link
              href="/wholesale"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Wholesale
            </Link>
            <Link
              href="/co-packaging"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Co-Packaging
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Contact
            </Link>
            <button className="relative p-2 text-gray-700 hover:text-red-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/fundraising"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Fundraising
              </Link>
              <Link
                href="/wholesale"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Wholesale
              </Link>
              <Link
                href="/co-packaging"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Co-Packaging
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

