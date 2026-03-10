# Book Catalog App

A personal web application for searching, organizing, and cataloging books you have read or want to read.

Users can search for books using the Open Library API, add them to their personal catalog, organize them into shelves, and mark favorites.

The interface is inspired by bookshelf-style layouts similar to Goodreads.

---

## Features

### Search for Books
- Search books using the **Open Library API**
- Displays book title, author, and cover image
- Add books directly to your catalog from search results
- Prevents duplicate entries

### Personal Book Catalog
- View your books in a **cover-based grid layout**
- Delete books from your catalog
- Books persist using **localStorage**

### Favorites
- Hover over a book to reveal a **star icon**
- Toggle favorite status with a single click
- Favorites can be viewed using the sidebar filter

### Bookshelves
Books can belong to **multiple shelves**:

- All
- Want to Read
- Currently Reading
- Read
- Favorites

Selecting a shelf filters the catalog to only show books from that shelf.

### Shelf Counts
The sidebar displays how many books are in each shelf.

Example:

```
All (5)
Want to Read (2)
Currently Reading (1)
Read (1)
Favorites (3)
```

---

## Tech Stack

- **React**
- **React Router**
- **JavaScript (ES6)**
- **CSS**
- **Open Library API**
- **localStorage** for persistence

---

## Project Structure

```
src/
│
├── components/
│   ├── CatalogGrid.jsx
│   ├── Sidebar.jsx
│   └── TopBar.jsx
│
├── pages/
│   ├── CatalogPage.jsx
│   └── SearchPage.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Data Model

Each book stored in the catalog has the following structure:

```javascript
{
  title: "Dune",
  author: "Frank Herbert",
  isbn: "9780441013593",
  coverUrl: "...",
  shelves: ["favorites", "read"]
}
```

The `shelves` array allows a book to belong to **multiple shelves simultaneously**.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/book-catalog
cd book-catalog
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser:

```
http://localhost:5173
```

---

## How It Works

### Searching for Books
The app queries the Open Library API:

```
https://openlibrary.org/search.json
```

Results are mapped to the app's internal book structure and displayed on the search page.

### Preventing Duplicates
Books are considered identical if:

- ISBN matches  
OR  
- Title + author match

### Persistence
Books are stored using:

```javascript
localStorage.setItem("books", JSON.stringify(books));
```

The catalog is restored automatically when the app loads.

---

## Future Improvements

Potential features to add:

- Custom user-created shelves
- Drag-and-drop shelf management
- Reading progress tracking
- Sorting and filtering options
- Book detail pages
- Cloud syncing
- Mobile responsive improvements

---

## Inspiration

The layout and bookshelf-style catalog interface are inspired by **Goodreads** and other personal library management tools.


