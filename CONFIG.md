# Configuration Guide

This document explains all available options in `src/config.json`.

## Basic Settings

### `title` (string, required)
The main title displayed on your homepage.

**Example:**
```json
"title": "BlogFlow Showcase"
```

### `description` (string, optional)
A subtitle or description shown below the title.

**Example:**
```json
"description": "Latest articles powered by the BlogFlow SDK."
```

### `theme` (string, required)
Choose from 17 available themes:

- `"default"` - Default theme
- `"blue"` - Blue theme
- `"minimal"` - Minimal theme
- `"modern"` - Modern theme
- `"dark"` - Dark theme
- `"magic"` - Magic Kingdom theme
- `"fantasy"` - Fantasy theme
- `"adventure"` - Adventure theme
- `"tomorrow"` - Tomorrow theme
- `"mainstreet"` - Main Street theme
- `"eyecare"` - Eye Care theme
- `"purewhite"` - Pure White theme
- `"pureblack"` - Pure Black theme
- `"cyanblue"` - Cyan Blue theme
- `"violet"` - Violet Gradient theme
- `"cardinal"` - Cardinal Gradient theme

**Example:**
```json
"theme": "default"
```

### `viewMode` (string, required)
Choose from 12 available view modes:

- `"card"` - Card layout
- `"list"` - List layout
- `"grid"` - Grid layout
- `"masonry"` - Masonry layout (CSS-based)
- `"waterfall"` - Waterfall layout (JS-based)
- `"magazine"` - Magazine layout
- `"dense"` - Dense layout
- `"timeline"` - Timeline layout
- `"fullscreen"` - Fullscreen layout
- `"fast"` - Fast layout
- `"modern"` - Modern layout
- `"carousel"` - Carousel layout

**Example:**
```json
"viewMode": "masonry"
```

### `language` (string, required)
Default content language. Supported languages:

- `"en"` - English
- `"zh"` - Chinese
- `"es"` - Spanish
- `"fr"` - French
- `"de"` - German
- `"ja"` - Japanese
- `"ko"` - Korean

**Example:**
```json
"language": "en"
```

### `paginationVariant` (string, required)
Choose pagination style:

- `"text"` - Text-based pagination
- `"icon"` - Icon-based pagination
- `"mixed"` - Mixed text and icons
- `"simple"` - Simple pagination

**Example:**
```json
"paginationVariant": "simple"
```

### `pageSize` (number, required)
Number of posts displayed per page.

**Recommended values:** 6-24

**Example:**
```json
"pageSize": 12
```

### `revalidateSeconds` (number, optional)
Cache revalidation time in seconds. This controls how often the content is refreshed from the API.

**Default:** 300 (5 minutes)

**Example:**
```json
"revalidateSeconds": 300
```

## Search Configuration

### `search.enabled` (boolean, required)
Enable or disable the search functionality.

**Example:**
```json
"search": {
  "enabled": true
}
```

## Card Styling

### `card.borderWidth` (number, required)
Border width in pixels.

**Range:** 0-10

**Default:** 1

**Example:**
```json
"card": {
  "borderWidth": 1
}
```

### `card.borderRadius` (number, required)
Border radius in rem units.

**Range:** 0-3

**Default:** 0.75

**Example:**
```json
"card": {
  "borderRadius": 1.25
}
```

### `card.borderColor` (string, required)
Border color in hex format.

**Options:**
- Hex color code (e.g., `"#e5eaf1"`)
- Empty string `""` to use theme default

**Example:**
```json
"card": {
  "borderColor": "#e5eaf1"
}
```

### `card.shadow` (number, required)
Shadow intensity.

**Range:** 0-10
- `0` = No shadow
- `1-10` = Increasing shadow intensity

**Default:** 1

**Example:**
```json
"card": {
  "shadow": 10
}
```

## Content Display Options

### `content.showExcerpt` (boolean, required)
Show post excerpt on cards.

**Example:**
```json
"content": {
  "showExcerpt": true
}
```

### `content.showCategory` (boolean, required)
Show category tags on cards.

**Example:**
```json
"content": {
  "showCategory": true
}
```

### `content.showDate` (boolean, required)
Show publication date on cards.

**Example:**
```json
"content": {
  "showDate": true
}
```

### `content.showListTitle` (boolean, required)
Show the main list title (e.g., "Posts (12)").

**Example:**
```json
"content": {
  "showListTitle": true
}
```

### `content.showCardTitle` (boolean, required)
Show post titles on individual cards.

**Example:**
```json
"content": {
  "showCardTitle": true
}
```

## Complete Example

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

## Additional Resources

For more information about the BlogFlow SDK, refer to the [official SDK documentation](https://www.npmjs.com/package/@blogflow/sdk).

