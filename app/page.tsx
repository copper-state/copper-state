'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Leaf, Award } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/shopify';
import { useEffect, useState } from 'react';
import type { ShopifyProduct } from '@/lib/shopify';

export default function Home() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Fetching products from Shopify...');
        const fetchedProducts = await getProducts(4);
        console.log('Products fetched:', fetchedProducts);
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          console.warn('No products returned from Shopify');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/popcorn_hero.png"
            alt="Popcorn hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >
            {/* Logo - 1/3 of the space */}
            <div className="relative w-full h-64 md:h-80 flex items-center justify-center order-2 md:order-1">
              <Image
                src="/CSFN_Logo-02.png"
                alt="Copper State Foods Logo"
                width={400}
                height={400}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            {/* Text Content - 2/3 of the space */}
            <div className="text-center md:text-left md:col-span-2 order-1 md:order-2">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Goodness in Every Kernel
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto md:mx-0">
                Welcome to Copper State Foods, where we craft exceptional popcorn and nutritious snacks with passion and transparency. From shareable family favorites to protein-packed fuel, discover a snack that's perfect for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Shop All Popcorn
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
                  >
                    Explore Our Nutrition Line
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Fan Favorites</h2>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Placeholder products when Shopify is not configured */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <Package className="w-24 h-24 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Popcorn</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Delicious, crunchy popcorn in a variety of flavors
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">$9.99</span>
                    <Link
                      href="/products/popcorn"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Leaf className="w-24 h-24 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sea Moss Water</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Nutritious and refreshing sea moss water drinks
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">$12.99</span>
                    <Link
                      href="/products/sea-moss-water"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the finest ingredients to create our products
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Natural & Healthy</h3>
              <p className="text-gray-600">
                All our products are made with natural, wholesome ingredients
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Award Winning</h3>
              <p className="text-gray-600">
                Recognized for excellence in food manufacturing
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Promise Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              From Our Kitchen to Yours, a Commitment to Quality.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              We believe that the best snacks start with the best ingredients. That's why we are dedicated to quality, transparency, and crafting innovative flavors you can feel good about. Whether you're looking for a fun family treat, a healthy snack, or a reliable partner for your business, you've come to the right place. We're popping with possibilities!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-blue-700 transition-colors shadow-lg"
              >
                Learn Our Story
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
