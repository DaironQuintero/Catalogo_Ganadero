import { useState, useEffect, useMemo } from "react"; 
import productsData from "./data/products.json";
import CardList from "./components/CardList";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar"; 
import "./App.css";

// --- FUNCIÓN AUXILIAR (Para mezclar los productos ) ---
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  // 1. Mezclar productos una sola vez al montar la app
  const randomizedProducts = useMemo(() => shuffleArray(productsData), []);

  // 2. Estados para filtros y vistas
  const [selectedLab, setSelectedLab] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("catalog");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3. Persistencia con LocalStorage (con manejo de errores)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart_ganadero");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error cargando carrito:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_ganadero", JSON.stringify(cart));
  }, [cart]);

  // 4. Lógica del Carrito
  const addToCart = (product) => {
    setCart((prev) => {
      // Clave única: ID + Presentación
      const isItemInCart = prev.find(
        (item) => item.id === product.id && item.selectedPres === product.selectedPres
      );

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === product.id && item.selectedPres === product.selectedPres
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, selectedPres) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedPres === selectedPres
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const deleteFromCart = (id, selectedPres) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedPres === selectedPres)));
  };

  const clearCart = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar todo tu pedido?")) {
      setCart([]);
    }
  };

  return (
    <>
      <Header
        onSelectLab={setSelectedLab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setView={setView}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        {view === "catalog" ? (
          <CardList
            products={randomizedProducts} 
            selectedLab={selectedLab}
            selectedCategory={selectedCategory}
            onSelectLab={setSelectedLab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSelectCategory={setSelectedCategory}
            onAddToCart={addToCart}
          />
        ) : (
          <About />
        )}

        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onRemove={removeFromCart}
          onAdd={addToCart}
          onClearCart={clearCart}
          onDelete={deleteFromCart}
        />
      </main>

      {/* Botón flotante de cantidad total */}
      {cart.length > 0 && !isCartOpen && (
        <button className="cart-floating-btn" onClick={() => setIsCartOpen(true)}>
           Ver mi pedido 🛒 <span>({cart.reduce((total, item) => total + item.quantity, 0)})</span>
        </button>
      )}

      <Footer />
    </>
  );
}

export default App;