import "../styles/Cards.css"
import categories from "../data/categories.json";

export default function Card({ product, onViewMore }) {
  // Buscamos la categoría actual en el JSON de categorías para obtener su emoji
  const categoryData = categories.find(cat => cat.id === product.category);

  return (
    <div className="card">
     
      {/*Poner la categoria encima de la card*/}
      {/*<span className={`category-badge ${product.category}`}>
        {categoryData ? `${categoryData.emoji} ${categoryData.name}` : product.category}
      </span>*/}

      
      <div className="card-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy" 
          className="card-image"
        />
      </div>

      <div className="card-content">
        <h3>{product.name}</h3>
        
        <p className="lab-name">{product.laboratory}</p>
        
        <button className="view-more-btn" onClick={onViewMore}>
          Ver más
        </button> 
      </div>
    </div>
  );
}