'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0]?.url;
  const price = product.variants[0]?.price || 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden group"
    >
      <Link href={`/products/${product.handle}`}>
        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.images[0]?.altText || product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="text-gray-400 text-4xl">📦</div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description || 'Premium quality product from Copper State Foods'}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-red-600">{price}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic here
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

