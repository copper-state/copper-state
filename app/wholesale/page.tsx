'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Package, Truck, Megaphone, CheckCircle } from 'lucide-react';

export default function WholesalePage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-yellow-500 to-blue-600 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Partner with Us. Delight Your Customers.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Bring the exceptional quality and innovative flavors of Copper State Foods to your shelves. We offer our popular retail and health-focused popcorn lines to wholesale partners who share our commitment to excellence.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Become a Retailer
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              A Partnership That Pops
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Joining our network of retailers means more than just stocking a product; it's about offering your customers a snack they can trust. We are collaborative partners, dedicated to supporting your business with reliable service and products that fly off the shelves.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Premium Product Lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Product Lines</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from our fun, flavorful D2C popcorn or our certified clean-ingredient wellness line.
              </p>
            </motion.div>

            {/* Reliable Supply Chain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reliable Supply Chain</h3>
              <p className="text-gray-600 leading-relaxed">
                We ensure consistent, on-time delivery so you never miss a sale.
              </p>
            </motion.div>

            {/* Marketing Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Megaphone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketing Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Let's work together. We provide assets and support to help you market our products effectively in your store.
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-blue-700 transition-colors shadow-lg"
              >
                Inquire About Wholesale
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
