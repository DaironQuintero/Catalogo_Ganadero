import { useState } from "react";
import "../styles/Header.css";
import labs from "../data/laboratorios.json";
import categories from "../data/categories.json";
import logo from "../assets/logo.jpg";

// 1. Agregamos selectedCategory y onSelectCategory a las props
export default function Header({ 
  onSelectLab, 
  searchTerm, 
  setSearchTerm, 
  setView, 
  selectedCategory, 
  onSelectCategory 
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [labsOpen, setLabsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
      <div className="header-top">
        <div className="logo-title">
          <img src={logo} alt="Logo" className="logo-img" />
          <div className="title-text">
            <h1>Ganadero Agrodistribuciones S.A.S</h1>
            <p>Catálogo de productos</p>
          </div>
        </div>

        {/* BUSCADOR */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar producto..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              &times;
            </button>
          )}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="#" onClick={(e) => { 
            e.preventDefault(); 
            setView("catalog");   
            onSelectLab(null);    
            onSelectCategory("todos"); //  reseteamos categoría al volver al inicio
            setSearchTerm("");    
            setMenuOpen(false);   
        }}>
          Catálogo
        </a>

        {/* DROPDOWN DE LABORATORIOS */}
        <div
          className="dropdown"
          onMouseEnter={() => window.innerWidth > 768 && setLabsOpen(true)}
          onMouseLeave={() => window.innerWidth > 768 && setLabsOpen(false)}
        >
          <span
            className="dropdown-btn"
            onClick={() => window.innerWidth <= 768 && setLabsOpen(!labsOpen)}
          >
            Laboratorios ▾
          </span>

          {labsOpen && (
            <div className="dropdown-menu">
              <a 
                href="#" 
                className="dropdown-item all-labs-option"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectLab(null);
                  setMenuOpen(false);
                  setLabsOpen(false);
                }}
              >
                🧪 Ver todos
              </a>
              {labs.map((lab) => (
                <a 
                  key={lab.id} 
                  href="#" 
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectLab(lab.name); 
                    setMenuOpen(false);
                    setLabsOpen(false);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                >
                  {lab.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* 2. FILTROS DE CATEGORÍA (Organizados dentro del NAV) */}
        <div className="category-nav-group">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              className={`cat-btn ${selectedCategory === cat.id ? "active" : ""}`} 
              onClick={() => { 
                onSelectCategory(cat.id); 
                setMenuOpen(false); 
              }}
            > 
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        <a href="#" onClick={(e) => { e.preventDefault(); setView("about"); setMenuOpen(false); }}>
          Nosotros
        </a>
      </nav>
      </div>
    </header>
  );
}