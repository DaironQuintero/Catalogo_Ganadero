import { useState } from "react";
import "../styles/Modal.css";

// Agregamos onAddToCart a las props
export default function Modal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  // 1. Convertir el string de presentaciones en un Array (si vienen separados por coma en tu JSON)
  const presentationOptions = product.presentations.split(",").map(p => p.trim());
  
  // 2. Estado para la presentación seleccionada (por defecto la primera)
  const [selectedPres, setSelectedPres] = useState(presentationOptions[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    // 3. Enviamos el producto pero le añadimos la presentación elegida
    onAddToCart({ ...product, selectedPres }); 
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Función para consultar por UN SOLO producto (comportamiento individual)
  const handleWhatsAppClick = () => {
    const businessNumber = "573104771202"; 
    const message = `Hola Ganadero Agrodistribuciones, me interesa obtener más información sobre: *${product.name}* (${product.laboratory}).`;
    
    const url = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={product.image} alt={product.name} className="modal-img" />
          </div>

          <div className="modal-details">
            <span className="lab-badge">🏢 {product.laboratory}</span>
            <h2>{product.name}</h2>
            
            <div className="info-group">
              <h4>📝 Descripción</h4>
              <p className="description-text">{product.description}</p>
            </div>
            <div className="info-group">
              <h4>📦 Elige la Presentación</h4>
              <div className="presentation-selector">
                {presentationOptions.map((pres) => (
                  <button
                    key={pres}
                    className={`pres-pill ${selectedPres === pres ? "active" : ""}`}
                    onClick={() => setSelectedPres(pres)}
                  >
                    {pres}
                  </button>
                ))}
              </div>
            </div>

            <div className="info-group">
              <h4>💉 Uso e Indicaciones</h4>
              <p className="usage-text">{product.usage}</p>
            </div>

            {/* BOTÓN 1: Consultar solo este producto */}
            <button className="modal-action-btn" onClick={handleWhatsAppClick}>
              Consultar precio por WhatsApp 📲
            </button>

            {/* BOTÓN 2: Añadir a la lista global */}
            <button 
              className={`add-to-cart-btn ${added ? 'added' : ''}`} 
              onClick={handleAdd}
              disabled={added}
            >
              {added ? "¡Agregado! ✅" : "Añadir a mi pedido 🛒"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}