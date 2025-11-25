'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Share2, Trophy } from 'lucide-react';

export default function FundraisingPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/soccer_team.png"
            alt="Soccer team"
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
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fundraise with Flavor. Support Your Team.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Introducing Allstar Popcorn Fundraising by Copper State Foods. We've created a simple, profitable, and downright delicious way for sports teams and organizations to reach their financial goals.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start Your Fundraiser
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Feature Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-0">
              {/* Image Section */}
              <div className="flex items-stretch justify-start order-2 md:order-1">
                <div className="relative w-full h-full min-h-64 md:min-h-[500px] overflow-hidden">
                  <Image
                    src="/AllStarPopcornBagImages.png"
                    alt="AllStar Popcorn Bag"
                    fill
                    className="object-contain object-left"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-center order-1 md:order-2 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Featuring "The Giving Bag our AllStar Popcorn"
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Our signature fundraising product, "AllStar Popcorn," is filled with our most beloved popcorn flavors. It's more than just a snack—it's an opportunity. Each bag sold is a step toward your team's victory, making it an easy and delightful product for your community to support.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-blue-700 transition-colors shadow-lg"
                    >
                      Get Fundraising Info Kit
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pop, Sell, and Succeed in 3 Easy Steps
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-8 text-center"
            >
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-red-600" />
              </div>
              <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Reach out to our fundraising team. We'll partner with you to set up your campaign and provide everything you need to get started.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 rounded-lg p-8 text-center"
            >
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-10 h-10 text-yellow-600" />
              </div>
              <div className="bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Share the Goodness</h3>
              <p className="text-gray-600 leading-relaxed">
                Your team sells our specially curated fundraising products, including "The Giving Bag," a crowd-pleasing assortment designed for success.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-8 text-center"
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-blue-600" />
              </div>
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Score Your Goals</h3>
              <p className="text-gray-600 leading-relaxed">
                You keep a generous portion of the profits to fund your team's uniforms, travel, and equipment. It's that easy!
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
