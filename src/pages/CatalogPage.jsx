import CatalogGrid from "../components/CatalogGrid";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

function CatalogPage({ books, allBooks, activeShelf, onShelfChange, onDeleteBook, onToggleShelf }) {
  return (
    <div className="page">
      <TopBar />
      <div className="layout">
        <Sidebar allBooks={allBooks} activeShelf={activeShelf} onShelfChange={onShelfChange} />
        <main className="content">
          <CatalogGrid books={books} onDeleteBook={onDeleteBook} onToggleShelf={onToggleShelf}/>
        </main>
      </div>
    </div>
  );
}

export default CatalogPage;
