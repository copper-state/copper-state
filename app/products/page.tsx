import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import TeamTracker from '@/components/TeamTracker';
import { Suspense } from 'react';

interface ProductsPageProps {
  searchParams: Promise<{ team?: string; player?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  let products: ShopifyProduct[] = [];
  
  try {
    products = await getProducts(20);
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  // Fallback products if Shopify is not configured
  if (products.length === 0) {
    products = [
      {
        id: 'popcorn-1',
        title: 'Premium Popcorn - Classic Butter',
        description: 'Delicious, crunchy popcorn with rich butter flavor. Made with premium kernels and natural ingredients.',
        handle: 'popcorn-classic-butter',
        price: 'USD 9.99',
        images: [],
        variants: [{ id: '1', title: 'Default', price: 'USD 9.99', availableForSale: true }],
      },
      {
        id: 'popcorn-2',
        title: 'Premium Popcorn - Caramel',
        description: 'Sweet and savory caramel popcorn that melts in your mouth. Perfect for movie nights!',
        handle: 'popcorn-caramel',
        price: 'USD 10.99',
        images: [],
        variants: [{ id: '2', title: 'Default', price: 'USD 10.99', availableForSale: true }],
      },
      {
        id: 'sea-moss-1',
        title: 'Sea Moss Water - Original',
        description: 'Nutritious and refreshing sea moss water drink. Packed with vitamins and minerals.',
        handle: 'sea-moss-water-original',
        price: 'USD 12.99',
        images: [],
        variants: [{ id: '3', title: 'Default', price: 'USD 12.99', availableForSale: true }],
      },
      {
        id: 'sea-moss-2',
        title: 'Sea Moss Water - Berry Blast',
        description: 'Delicious sea moss water with natural berry flavors. Healthy and refreshing!',
        handle: 'sea-moss-water-berry',
        price: 'USD 13.99',
        images: [],
        variants: [{ id: '4', title: 'Default', price: 'USD 13.99', availableForSale: true }],
      },
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Tracker - shows if team parameter is in URL */}
        <Suspense fallback={null}>
          <TeamTracker />
        </Suspense>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of popcorn and sea moss water drinks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

