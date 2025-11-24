# BlogFlow SDK - Universal Website Template

This is a universal website template built with [Next.js](https://nextjs.org) and the [@blogflow/sdk](https://www.npmjs.com/package/@blogflow/sdk). It provides a ready-to-use blog website that can be customized through a simple JSON configuration file.

## Overview

This template is designed to be a production-ready blog website powered by the BlogFlow SDK. Users can customize the appearance, behavior, and content display by modifying the `src/config.json` file according to the SDK documentation. No coding knowledge is required for basic customization.

## Features

- ✅ **BlogFlow SDK Integration** - Full integration with `BlogFlowProvider` and all SDK components
- ✅ **JSON-Based Configuration** - Easy customization through `src/config.json`
- ✅ **Multiple Themes** - 17 built-in themes (default, blue, minimal, modern, dark, magic, fantasy, etc.)
- ✅ **Multiple View Modes** - 12 view modes (grid, card, list, masonry, waterfall, magazine, etc.)
- ✅ **Card Styling Controls** - Customize border, radius, shadow, and color
- ✅ **Content Display Controls** - Toggle excerpt, category, date, and title visibility
- ✅ **Multi-language Support** - Support for 7 languages (en, zh, es, fr, de, ja, ko)
- ✅ **Search Functionality** - Built-in search with language support
- ✅ **Pagination** - Multiple pagination styles (text, icon, mixed, simple)
- ✅ **Markdown Support** - Full markdown rendering with GFM support
- ✅ **Responsive Design** - Mobile-friendly and responsive layout

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

**Note:** You can also use `BLOGFLOW_API_KEY` for server-side usage. Get your API key from: https://blogflow.com.au

### 3. Configure Your Website

Edit `src/config.json` to customize your website. See the [Configuration Guide](#configuration-guide) below for detailed options.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration Guide

All website customization is done through `src/config.json`. Users can modify this file according to the BlogFlow SDK documentation to customize their website without writing code.

**📖 For detailed configuration options and all available values, see [CONFIG.md](./CONFIG.md).**

## Example Configuration

See `src/config.json` for a complete example. Here's a sample configuration:

```json
{
  "title": "BlogFlow Showcase",
  "description": "Latest articles powered by the BlogFlow SDK.",
  "theme": "default",
  "viewMode": "masonry",
  "language": "en",
  "paginationVariant": "simple",
  "pageSize": 12,
  "revalidateSeconds": 300,
  "search": {
    "enabled": true
  },
  "card": {
    "borderWidth": 1,
    "borderRadius": 1.25,
    "borderColor": "#e5eaf1",
    "shadow": 10
  },
  "content": {
    "showExcerpt": true,
    "showCategory": true,
    "showDate": true,
    "showListTitle": true,
    "showCardTitle": true
  }
}
```


## Project Structure

```
blogflow-examples/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage (reads from config.json)
│   │   ├── Client.tsx        # Main client component
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── PostDetail.tsx    # Post detail modal with markdown support
│   │   └── SocialShareToolbar.tsx
│   └── config.json           # Main configuration file
├── .env.local                 # Environment variables (create this)
└── package.json
```

## Learn More

- [BlogFlow SDK Documentation](https://www.npmjs.com/package/@blogflow/sdk) - Learn about the SDK features and API
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering library

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your `NEXT_PUBLIC_BLOGFLOW_API_KEY` environment variable
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is open source and available under the MIT License.

## Author & Support

**Author:** [Ausdata Science](https://ausdata.ai)  
**Support:** [Ausdata Lab](https://www.ausdata.org) | [Ausdata Matrix](https://www.ausdata.app)

