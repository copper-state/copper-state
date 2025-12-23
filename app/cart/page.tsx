'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { cart, updateItem, removeItem, isLoading } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await handleRemoveItem(lineId);
      return;
    }

    setUpdatingItems((prev) => new Set(prev).add(lineId));
    try {
      await updateItem(lineId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(lineId);
        return next;
      });
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    setUpdatingItems((prev) => new Set(prev).add(lineId));
    try {
      await removeItem(lineId);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(lineId);
        return next;
      });
    }
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      // Add return URL to checkout so users can come back
      const returnUrl = encodeURIComponent(`${window.location.origin}/products`);
      const checkoutUrl = cart.checkoutUrl.includes('?')
        ? `${cart.checkoutUrl}&return_to=${returnUrl}`
        : `${cart.checkoutUrl}?return_to=${returnUrl}`;
      window.location.href = checkoutUrl;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
  const total = parseFloat(cart.cost.totalAmount.amount);
  const currency = cart.cost.totalAmount.currencyCode;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.lines.edges.map(({ node: lineItem }) => {
              const image = lineItem.merchandise.product.images.edges[0]?.node;
              const isUpdating = updatingItems.has(lineItem.id);
              const teamAttribute = lineItem.attributes.find((attr) => attr.key === 'Fundraising Team');

              return (
                <div
                  key={lineItem.id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${lineItem.merchandise.product.handle}`}
                    className="relative w-full sm:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    {image ? (
                      <Image
                        src={image.url}
                        alt={image.altText || lineItem.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                        📦
                      </div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/products/${lineItem.merchandise.product.handle}`}
                        className="text-xl font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      >
                        {lineItem.merchandise.product.title}
                      </Link>
                      {lineItem.merchandise.title !== 'Default Title' && (
                        <p className="text-gray-600 mt-1">{lineItem.merchandise.title}</p>
                      )}
                      {teamAttribute && (
                        <p className="text-sm text-blue-600 mt-1">
                          Fundraising Team: {teamAttribute.value}
                        </p>
                      )}
                      <p className="text-lg font-bold text-red-600 mt-2">
                        {currency} {parseFloat(lineItem.merchandise.price.amount).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(lineItem.id, lineItem.quantity - 1)}
                          disabled={isUpdating}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 min-w-[3rem] text-center font-semibold text-gray-900">
                          {isUpdating ? (
                            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto" />
                          ) : (
                            lineItem.quantity
                          )}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(lineItem.id, lineItem.quantity + 1)}
                          disabled={isUpdating}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(lineItem.id)}
                        disabled={isUpdating}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    {currency} {subtotal.toFixed(2)}
                  </span>
                </div>
                {total !== subtotal && (
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span className="font-semibold">
                      {currency} {(total - subtotal).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-red-600">
                      {currency} {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 border border-gray-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>

              <p className="text-sm text-gray-500 text-center mt-4">
                {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'} in your cart
              </p>
              <p className="text-xs text-gray-400 text-center mt-2">
                You can use your browser's back button to return from checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

