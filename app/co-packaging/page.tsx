'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FlaskConical, Package, Box, Shield, TrendingUp } from 'lucide-react';

export default function CoPackagingPage() {
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
              Your Vision, Our Expertise.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Let's create something exceptional together. Copper State Foods is your trusted manufacturing partner for co-packing and private label snack, and food packaging production. Our state-of-the-art facility and collaborative spirit make us the perfect choice to bring your product to life.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Discuss Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Capabilities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              A Facility Built for Quality and Innovation
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              From recipe development to final packaging, we are your comprehensive solution. We handle every step with precision and care, ensuring your product meets the highest standards of quality and safety.
            </p>
          </motion.div>

          {/* Facility Images Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group"
              >
                <Image
                  src={`/facility${num}.jpg`}
                  alt={`Facility image ${num}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Custom Recipe Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FlaskConical className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Recipe Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Our food science team will collaborate with you to craft the perfect flavor profile.
              </p>
            </motion.div>

            {/* Flexible Packaging Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Packaging Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                We offer a variety of bag sizes, styles, and materials to fit your brand identity.
              </p>
            </motion.div>

            {/* Packaging for Your Nutrition & Food Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Box className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Packaging for Your Nutrition & Food Products</h3>
              <p className="text-gray-600 leading-relaxed">
                We provide tailored packaging solutions for your existing product lines, ensuring they meet your brand's standards and market needs.
              </p>
            </motion.div>

            {/* Quality & Safety Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality & Safety Certifications</h3>
              <p className="text-gray-600 leading-relaxed">
                Our facility adheres to strict quality assurance protocols, giving you and your customers peace of mind.
              </p>
            </motion.div>

            {/* Scalable Production */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 rounded-lg p-8 md:col-span-2 lg:col-span-1"
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scalable Production</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a startup or an established brand, we have the capacity to grow with you.
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
                Request a Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
