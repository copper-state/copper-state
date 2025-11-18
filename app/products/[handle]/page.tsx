import { getProductByHandle, getProducts } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/shopify';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  try {
    const products = await getProducts(50);
    return products.map((product) => ({
      handle: product.handle,
    }));
  } catch (error) {
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  let product: ShopifyProduct | null = null;

  try {
    product = await getProductByHandle(handle);
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  if (!product) {
    notFound();
  }

  const mainImage = product.images[0]?.url;
  const price = product.variants[0]?.price || 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.images[0]?.altText || product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="text-gray-400 text-6xl">📦</div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-red-600">{price}</span>
                {product.variants[0]?.compareAtPrice && (
                  <span className="text-xl text-gray-500 line-through ml-4">
                    {product.variants[0].compareAtPrice}
                  </span>
                )}
              </div>

              {product.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Variants */}
              {product.variants.length > 1 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Variants</h3>
                  <div className="space-y-2">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <span className="text-gray-700">{variant.title}</span>
                        <span className="font-semibold text-red-600">{variant.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              {!product.variants[0]?.availableForSale && (
                <p className="text-red-600 mt-4 text-center">Currently out of stock</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

