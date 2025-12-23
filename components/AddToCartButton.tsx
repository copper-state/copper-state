'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import type { ShopifyProduct } from '@/lib/shopify';

interface AddToCartButtonProps {
  product: ShopifyProduct;
  variantId?: string;
}

export default function AddToCartButton({ product, variantId }: AddToCartButtonProps) {
  const { addItem, isLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const selectedVariant = variantId
    ? product.variants.find((v) => v.id === variantId) || product.variants[0]
    : product.variants[0];

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setIsAdding(true);
    setMessage(null);

    try {
      // Get team from sessionStorage (set by TeamTracker, clears when tab closes)
      const teamId = typeof window !== 'undefined' ? sessionStorage.getItem('fundraising_team') : null;
      
      const attributes = teamId
        ? [{ key: 'Fundraising Team', value: teamId }]
        : undefined;

      await addItem(selectedVariant.id, 1, attributes);
      
      setMessage({ type: 'success', text: 'Added to cart!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to add to cart' 
      });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsAdding(false);
    }
  };

  const isAvailable = selectedVariant?.availableForSale ?? false;
  const disabled = !isAvailable || isAdding || isLoading;

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={disabled}
        className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        {isAdding ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </button>
      {!isAvailable && (
        <p className="text-red-600 mt-4 text-center">Currently out of stock</p>
      )}
      {message && (
        <p className={`mt-4 text-center ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
    </>
  );
}

