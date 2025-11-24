This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## BlogFlow SDK Examples

This project demonstrates how to use the [@blogflow/sdk](https://www.npmjs.com/package/@blogflow/sdk) with access card configuration using the official recommended methods.

### Features

- ✅ BlogFlow SDK integration with `BlogFlowProvider`
- ✅ Access card styling configuration (border, radius, shadow, color)
- ✅ Multiple view modes (grid, card, list, masonry, waterfall, etc.)
- ✅ Multiple themes (default, blue, minimal, modern, dark, etc.)
- ✅ Card content display controls (excerpt, category, date)
- ✅ Multi-language support (en, zh, es, fr, de, ja, ko)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_BLOGFLOW_API_KEY=your_api_key_here
```

Get your API key from: https://blogflow-api-server.vercel.app

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Configure Access Cards

The page includes a control panel where you can:
- Select different themes
- Choose view modes
- Adjust card border width, radius, color, and shadow
- Toggle card content display (excerpt, category, date)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
