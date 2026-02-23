import { useState, useEffect } from "react";
import Card from "./Card";
import Modal from "./Modal";
import "../styles/Cards.css";

export default function CardList({ 
  products, 
  selectedLab, 
  onSelectLab, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory,
  onSelectCategory,
  onAddToCart 
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // --- LÓGICA DE PAGINACIÓN ---
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Resetear a la página 1 cuando cambien los filtros o la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLab, searchTerm, selectedCategory]);

  // 1. Filtrado de productos
  const filteredProducts = (products || []).filter((product) => {
    const selected = (selectedCategory || "todos").toLowerCase();

    const matchesCategory = 
      selected === "todos" || 
      (Array.isArray(product.category) 
        ? product.category.some(cat => typeof cat === "string" && cat.toLowerCase() === selected)
        : product.category?.toLowerCase() === selected);

    const matchesLab = !selectedLab || product.laboratory === selectedLab;

    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesLab && matchesSearch;
  });

  // 2. Cálculos para la paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  // Estos son los productos que se verán en la pantalla actual
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="catalog-section">
      {/* Información de filtros activos */}
      <div className="filter-info">
        {searchTerm && <p>Resultados para: "<strong>{searchTerm}</strong>"</p>}
        
        <div className="active-filters-display">
          {selectedCategory !== "todos" && (
            <span className="badge-title">
              {selectedCategory === "ganaderia" ? "🐄 Ganadería" : "🐶 Mascotas"}
            </span>
          )}
          {selectedLab ? (
            <h2>Laboratorio: <span>{selectedLab}</span></h2>
          ) : (
            <h2>{selectedCategory === "todos" && !searchTerm ? "Todos los productos" : ""}</h2>
          )}
        </div>
      </div>

      {/* Contenedor de Tarjetas */}
      <div className="cards-container">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <Card 
              key={`${product.id}-${product.name}`}
              product={product} 
              onViewMore={() => setSelectedProduct(product)} 
              onAddToCart={onAddToCart} 
            />
          ))
        ) : (
          <div className="no-results">
            <span className="no-results-icon">🔎</span>
            <p>No encontramos productos que coincidan con tu búsqueda.</p>
            <button 
              className="reset-catalog-btn"
              onClick={() => {
                onSelectLab(null); 
                setSearchTerm("");
                onSelectCategory("todos");
              }}
            >
              Ver todo el catálogo
            </button>
          </div>
        )}
      </div>

      {/* --- BOTONES DE PAGINACIÓN --- */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => paginate(currentPage - 1)}
            className="pag-nav"
          >
            &laquo; Anterior
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages} 
            onClick={() => paginate(currentPage + 1)}
            className="pag-nav"
          >
            Siguiente &raquo;
          </button>
        </div>
      )}

      {selectedProduct && (
        <Modal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={onAddToCart}
        />
      )}
      
      {(selectedLab || selectedCategory !== "todos" || searchTerm) && filteredProducts.length > 0 && (
        <button 
          className="clear-filter-btn" 
          onClick={() => {
            onSelectLab(null);
            onSelectCategory("todos");
            setSearchTerm("");
          }}
        >
          Limpiar todos los filtros ✕
        </button>
      )}
    </section>
  );
}