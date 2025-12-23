import { NextRequest, NextResponse } from 'next/server';
import { addToCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, lines } = body;

    if (!cartId) {
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: 'Lines are required' }, { status: 400 });
    }

    const cart = await addToCart(cartId, lines);

    if (!cart) {
      return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

