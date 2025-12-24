# Treinetic Open Source Projects Showcase

Welcome to the official showcase for **Treinetic's Open Source Libraries**. This project is a unified web application designed to demonstrate the powerful capabilities of our PHP libraries, such as **PDFLib** and **ImageArtist**, in a modern, interactive environment.

## 🚀 Projects Showcased

*   **[PDFLib](https://github.com/imalhasaranga/PDFLib)**: A robust library for PDF manipulation (Merge, Split, Encrypt, Convert, OCR, and more).
*   **[ImageArtist](https://github.com/treinetic/ImageArtist)**: An elegant, fluent image manipulation toolkit (Resize, Crop, Overlay, Shapes, Filters).
*   **[VideoRecorderJs](https://github.com/imalhasaranga/VideoRecorderJs)**: Modern HTML5 Video & Screen Recording Library.

---

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   **PHP 8.0+** (with GD and Imagick extensions recommended)
*   **Composer**
*   **Node.js** (v18+) & **npm**
*   **Ghostscript** (Required for PDFLib features)
*   **Tesseract OCR** (Required for PDFLib OCR features)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2.  **Install PHP Dependencies:**
    ```bash
    composer install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

### Running the Application

This project consists of a **PHP Backend** (serving API endpoints) and a **React Frontend** (Vite). You need to run both.

**Option 1: Concurrent Command (Recommended)**
```bash
npm run start
# OR manually:
php -S localhost:8000 -t . & npm run dev
```

**Option 2: Individual Terminals**
*   Terminal 1 (Backend):
    ```bash
    php -S localhost:8000 -t .
    ```
*   Terminal 2 (Frontend):
    ```bash
    npm run dev
    ```

The application will be accessible at **http://localhost:5173** (or the port shown in your terminal).

---

## 🎨 Development Guidelines

We strive for a consistent, premium "Developer Aesthetic" across all our demos. If you are contributing a new demo page or modifying an existing one, strictly adhere to our design rules.

### Creating a New Demo Page

Please refer to the **[Demo Page Rules](./demopagerules.md)** document for detailed instructions on:
*   Directory Structure
*   Component Hierarchy (`App.jsx`)
*   Design System (Colors, Typography, CSS Variables)
*   Feature Card Layouts

### Technical Note
*   **Frontend**: Built with React and Vite. Styling is handled via pure CSS (Variables) in `src/index.css`. **Do not use Tailwind CSS**.
*   **Backend**: Plain PHP scripts located in `api/`. Each library has its own subdirectory (e.g., `api/pdflib/`, `api/imageartist/`).
*   **Routing**: Handled via `react-router-dom` in `src/App.jsx`.

---

## 📄 License

This project is open-source and available under the MIT License.
