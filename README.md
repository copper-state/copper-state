# Copper State Foods Website

A modern e-commerce website for Copper State Foods, built with Next.js, TypeScript, Framer Motion, and Lucide React. The site integrates with Shopify to sell premium popcorn and sea moss water drinks.

## Features

- 🛍️ Shopify Storefront API integration
- 🎨 Beautiful UI with red, yellow, and blue color scheme
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🚀 Built with Next.js 16 and TypeScript
- 🎯 Product pages for popcorn and sea moss water drinks

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Tailwind CSS** - Utility-first CSS framework
- **Shopify Storefront API** - E-commerce integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Shopify store with Storefront API access

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

### Shopify Setup

To get your Shopify Storefront API credentials:

1. Log in to your Shopify admin panel
2. Go to **Settings** > **Apps and sales channels** > **Develop apps**
3. Click **Create an app**
4. Name your app (e.g., "Copper State Foods Storefront")
5. Click **Configure Admin API scopes** and enable:
   - `read_products`
   - `read_product_listings`
6. Click **Configure Storefront API scopes** and enable:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
7. Click **Save**
8. Click **Install app**
9. Go to the **API credentials** tab
10. Under **Storefront API**, click **Reveal token once**
11. Copy the token and add it to your `.env.local` file

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
copper-state/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── products/          # Products pages
│   │   └── [handle]/      # Individual product pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Footer.tsx          # Footer component
│   └── ProductCard.tsx    # Product card component
└── lib/                   # Utility functions
    └── shopify.ts         # Shopify API client
```

## Pages

- **Home** (`/`) - Hero section, features, and featured products
- **Products** (`/products`) - All products listing
- **Product Detail** (`/products/[handle]`) - Individual product pages
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and information

## Color Scheme

The website uses a red, yellow, and blue color scheme:
- **Red**: Primary brand color (#bb123c)
- **Yellow**: Accent color (#ffd700)
- **Blue**: Secondary accent (#002864)

## Build for Production

```bash
npm run build
npm start
```

## Deploy

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

## License

© 2024 Copper State Foods. All rights reserved.
