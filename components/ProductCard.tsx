'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const mainImage = product.images[0]?.url;
  const price = product.variants[0]?.price || 'N/A';

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${product.handle}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden group"
    >
      <Link href={`/products/${product.handle}`} className="block">
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
        </div>
      </Link>
      <div className="px-6 pb-6 flex items-center justify-between">
        <span className="text-2xl font-bold text-red-600">{price}</span>
        <button
          onClick={handleCartClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition-colors inline-flex items-center justify-center"
          aria-label="View product"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

