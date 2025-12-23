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
    compareAtPrice?: string;
    availableForSale: boolean;
  }[];
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
}

export interface CartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
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
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
  attributes: Array<{
    key: string;
    value: string;
  }>;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: CartLineItem;
    }>;
  };
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

// GraphQL mutation to create a cart
const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          id
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL mutation to add items to cart
const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          id
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL mutation to update cart lines
const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          id
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL mutation to remove cart lines
const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          id
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL query to get cart
const CART_QUERY = `
  query getCart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        id
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
            attributes {
              key
              value
            }
          }
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

    return data.products.edges.map(({ node }) => {
      const firstVariant = node.variants.edges[0]?.node;
      const price = firstVariant
        ? `${firstVariant.price.currencyCode} ${firstVariant.price.amount}`
        : 'N/A';
      const compareAtPrice = firstVariant?.compareAtPrice
        ? `${firstVariant.compareAtPrice.currencyCode} ${firstVariant.compareAtPrice.amount}`
        : undefined;

      return {
        id: node.id,
        title: node.title,
        description: node.description,
        handle: node.handle,
        price,
        compareAtPrice,
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
    });
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
    const firstVariant = node.variants.edges[0]?.node;
    const price = firstVariant
      ? `${firstVariant.price.currencyCode} ${firstVariant.price.amount}`
      : 'N/A';
    const compareAtPrice = firstVariant?.compareAtPrice
      ? `${firstVariant.compareAtPrice.currencyCode} ${firstVariant.compareAtPrice.amount}`
      : undefined;

    return {
      id: node.id,
      title: node.title,
      description: node.description,
      handle: node.handle,
      price,
      compareAtPrice,
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

// Cart API Functions

export async function createCart(
  lines?: Array<{ merchandiseId: string; quantity: number; attributes?: Array<{ key: string; value: string }> }>
): Promise<ShopifyCart | null> {
  try {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: ShopifyCart | null;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>({
      query: CART_CREATE_MUTATION,
      variables: {
        input: lines ? { lines } : {},
      },
    });

    if (data.cartCreate.userErrors.length > 0) {
      console.error('Cart create errors:', data.cartCreate.userErrors);
      throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(', '));
    }

    return data.cartCreate.cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number; attributes?: Array<{ key: string; value: string }> }>
): Promise<ShopifyCart | null> {
  try {
    const data = await shopifyFetch<{
      cartLinesAdd: {
        cart: ShopifyCart | null;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>({
      query: CART_LINES_ADD_MUTATION,
      variables: {
        cartId,
        lines,
      },
    });

    if (data.cartLinesAdd.userErrors.length > 0) {
      console.error('Cart add errors:', data.cartLinesAdd.userErrors);
      throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join(', '));
    }

    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export async function updateCart(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart | null> {
  try {
    const data = await shopifyFetch<{
      cartLinesUpdate: {
        cart: ShopifyCart | null;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>({
      query: CART_LINES_UPDATE_MUTATION,
      variables: {
        cartId,
        lines,
      },
    });

    if (data.cartLinesUpdate.userErrors.length > 0) {
      console.error('Cart update errors:', data.cartLinesUpdate.userErrors);
      throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join(', '));
    }

    return data.cartLinesUpdate.cart;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart | null> {
  try {
    const data = await shopifyFetch<{
      cartLinesRemove: {
        cart: ShopifyCart | null;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>({
      query: CART_LINES_REMOVE_MUTATION,
      variables: {
        cartId,
        lineIds,
      },
    });

    if (data.cartLinesRemove.userErrors.length > 0) {
      console.error('Cart remove errors:', data.cartLinesRemove.userErrors);
      throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join(', '));
    }

    return data.cartLinesRemove.cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const data = await shopifyFetch<{
      cart: ShopifyCart | null;
    }>({
      query: CART_QUERY,
      variables: {
        id: cartId,
      },
    });

    return data.cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

