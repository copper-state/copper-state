// Shopify Storefront API client
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-10';

// Debug: Log configuration (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Shopify Config:', {
    domain: SHOPIFY_STORE_DOMAIN ? 'SET' : 'MISSING',
    token: SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'SET' : 'MISSING',
    version: SHOPIFY_API_VERSION,
  });
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  price: string;
  compareAtPrice?: string;
  images: {
    id: string;
    url: string;
    altText?: string;
  }[];
  variants: {
    id: string;
    title: string;
    price: string;
    availableForSale: boolean;
  }[];
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
}

// GraphQL query to fetch products
const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 5) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch a single product by handle
const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch collections
const COLLECTIONS_QUERY = `
  query getCollections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
        }
      }
    }
  }
`;

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  // Check if credentials are configured
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.error('Shopify credentials not configured. Please check your .env.local file.');
    console.log('Store Domain:', SHOPIFY_STORE_DOMAIN || 'MISSING');
    console.log('Access Token:', SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'SET' : 'MISSING');
    throw new Error('Shopify credentials not configured');
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  console.log('Shopify API endpoint:', endpoint);

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!result.ok) {
      const errorText = await result.text();
      console.error('Shopify API error response:', errorText);
      throw new Error(`Shopify API error: ${result.status} ${result.statusText}`);
    }

    const json = await result.json();

    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    return json.data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}

export async function getProducts(first: number = 20): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{
      products: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            description: string;
            handle: string;
            images: {
              edges: Array<{
                node: {
                  id: string;
                  url: string;
                  altText?: string;
                };
              }>;
            };
            variants: {
              edges: Array<{
                node: {
                  id: string;
                  title: string;
                  price: {
                    amount: string;
                    currencyCode: string;
                  };
                  compareAtPrice?: {
                    amount: string;
                    currencyCode: string;
                  };
                  availableForSale: boolean;
                };
              }>;
            };
          };
        }>;
      };
    }>({
      query: PRODUCTS_QUERY,
      variables: { first },
    });

    return data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      handle: node.handle,
      images: node.images.edges.map(({ node: img }) => ({
        id: img.id,
        url: img.url,
        altText: img.altText,
      })),
      variants: node.variants.edges.map(({ node: variant }) => ({
        id: variant.id,
        title: variant.title,
        price: `${variant.price.currencyCode} ${variant.price.amount}`,
        compareAtPrice: variant.compareAtPrice
          ? `${variant.compareAtPrice.currencyCode} ${variant.compareAtPrice.amount}`
          : undefined,
        availableForSale: variant.availableForSale,
      })),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<{
      productByHandle: {
        id: string;
        title: string;
        description: string;
        handle: string;
        images: {
          edges: Array<{
            node: {
              id: string;
              url: string;
              altText?: string;
            };
          }>;
        };
        variants: {
          edges: Array<{
            node: {
              id: string;
              title: string;
              price: {
                amount: string;
                currencyCode: string;
              };
              compareAtPrice?: {
                amount: string;
                currencyCode: string;
              };
              availableForSale: boolean;
            };
          }>;
        };
      } | null;
    }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    if (!data.productByHandle) {
      return null;
    }

    const node = data.productByHandle;
    return {
      id: node.id,
      title: node.title,
      description: node.description,
      handle: node.handle,
      images: node.images.edges.map(({ node: img }) => ({
        id: img.id,
        url: img.url,
        altText: img.altText,
      })),
      variants: node.variants.edges.map(({ node: variant }) => ({
        id: variant.id,
        title: variant.title,
        price: `${variant.price.currencyCode} ${variant.price.amount}`,
        compareAtPrice: variant.compareAtPrice
          ? `${variant.compareAtPrice.currencyCode} ${variant.compareAtPrice.amount}`
          : undefined,
        availableForSale: variant.availableForSale,
      })),
    };
  } catch (error) {
    console.error('Error fetching product by handle:', error);
    return null;
  }
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  try {
    const data = await shopifyFetch<{
      collections: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            handle: string;
            description?: string;
          };
        }>;
      };
    }>({
      query: COLLECTIONS_QUERY,
    });

    return data.collections.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
    }));
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

