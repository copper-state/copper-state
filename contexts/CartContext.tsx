'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ShopifyCart, CartLineItem } from '@/lib/shopify';

interface CartContextType {
  cart: ShopifyCart | null;
  cartId: string | null;
  isLoading: boolean;
  addItem: (variantId: string, quantity?: number, attributes?: Array<{ key: string; value: string }>) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  getCartCount: () => number;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'shopify_cart_id';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart ID from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCartId = localStorage.getItem(CART_ID_KEY);
      if (storedCartId) {
        setCartId(storedCartId);
        // Fetch cart data
        fetchCart(storedCartId);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const fetchCart = async (id: string) => {
    try {
      const response = await fetch(`/api/cart?id=${id}`);
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      } else {
        // Cart might be invalid, clear it
        localStorage.removeItem(CART_ID_KEY);
        setCartId(null);
        setCart(null);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCart = async () => {
    if (cartId) {
      await fetchCart(cartId);
    }
  };

  const addItem = async (
    variantId: string,
    quantity: number = 1,
    attributes?: Array<{ key: string; value: string }>
  ) => {
    try {
      setIsLoading(true);
      let currentCartId = cartId;

      // Create cart if it doesn't exist
      if (!currentCartId) {
        const createResponse = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lines: [{ merchandiseId: variantId, quantity, attributes }],
          }),
        });

        if (!createResponse.ok) throw new Error('Failed to create cart');

        const newCart = await createResponse.json();
        currentCartId = newCart.id;
        setCartId(currentCartId);
        setCart(newCart);
        localStorage.setItem(CART_ID_KEY, currentCartId);
      } else {
        // Add to existing cart
        const addResponse = await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartId: currentCartId,
            lines: [{ merchandiseId: variantId, quantity, attributes }],
          }),
        });

        if (!addResponse.ok) throw new Error('Failed to add to cart');

        const updatedCart = await addResponse.json();
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cartId) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          lines: [{ id: lineId, quantity }],
        }),
      });

      if (!response.ok) throw new Error('Failed to update cart');

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cartId) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          lineIds: [lineId],
        }),
      });

      if (!response.ok) throw new Error('Failed to remove from cart');

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCartCount = () => {
    return cart?.totalQuantity || 0;
  };

  const clearCart = () => {
    setCart(null);
    setCartId(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_ID_KEY);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        isLoading,
        addItem,
        updateItem,
        removeItem,
        getCartCount,
        refreshCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

