import { NextRequest, NextResponse } from 'next/server';
import { removeFromCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, lineIds } = body;

    if (!cartId) {
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }

    if (!lineIds || !Array.isArray(lineIds) || lineIds.length === 0) {
      return NextResponse.json({ error: 'Line IDs are required' }, { status: 400 });
    }

    const cart = await removeFromCart(cartId, lineIds);

    if (!cart) {
      return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}

