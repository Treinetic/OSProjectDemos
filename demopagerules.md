---
description: Create a Demo Page
---
# Demo Page Rules

This document outlines the standard structure and design rules for creating new demo pages in the Treinetic Open Source Projects showcase.

## 1. Directory Structure

All demos should live within `src/lib/<project-name>/` and have a main entry point `App.jsx`.

```
src/
  lib/
    <project-name>/
      App.jsx      # Main demo component
      ...          # Helper components
```

## 2. Component Structure

The `App.jsx` should export a default function component (e.g., `PDFLibApp`) and follow this layout hierarchy:

1.  **Container**: `<div className="app-container">`
2.  **Navbar**: Standard navbar containing:
    *   **Logo**: Icon and Project Name.
    *   **GitHub Link**: An `<a>` tag with the Github icon pointing to the repository.
3.  **Main Content**: `<main className="max-w-container">`
4.  **Hero Section**:
    *   Title (`h1.hero-title`): Gradient text using `WebkitBackgroundClip: text`.
    *   Subtitle (`p.hero-subtitle`): Brief description.
    *   **Install Command**: An `.install-box` showing the `composer require` command with a copy button.
5.  **Features Grid**: A grid of cards (`.features-grid` -> `.card`) showcasing core functionalities.

## 3. Styling & Design System

Do **NOT** use Tailwind CSS directly. Use the custom CSS variables and classes defined in `src/index.css`.

### Colors
*   **Background**: `var(--bg-dark)` (Main), `var(--bg-panel)` (Cards)
*   **Primary**: `var(--primary)` (Violet - PDFLib), `var(--primary-glow)`
*   **Accents**: `var(--accent)` (Cyan), `--pink-border` (ImageArtist)
*   **Text**: `var(--text-main)`, `var(--text-muted)`

### Common Classes
*   `.app-container`: Flex column layout, min-height 100vh.
*   `.max-w-container`: Centered container with max-width 1200px.
*   `.navbar`: Fixed top navigation bar.
*   `.hero-title`: Large gradient heading.
*   `.card`: Glassmorphic card style.
*   `.code-block`: Dark code snippet container.
*   `.demo-btn`: Action button with icon.

## 4. Feature Cards

Each feature should be represented by a card containing:
1.  **Icon**: Lucide React icon inside `.card-icon`.
2.  **Title**: `h3`.
3.  **Description**: `p` text.
4.  **Code Snippet**: A `.code-block` containing a usage example.
5.  **Action Button**: A `.demo-btn` ("Try Live Demo") if interactive.

## 5. Deployment

When packaging the demo:
1.  Ensure all API endpoints use absolute URLs (e.g., `http://localhost:8000/api/...`) or are logically routed.
2.  Verify `php -S` server is running.
3.  Ensure `npm run dev` builds the frontend correctly.
