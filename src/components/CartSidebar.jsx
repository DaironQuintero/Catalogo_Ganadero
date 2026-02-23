import React from 'react';
import '../styles/CartSidebar.css';

export default function CartSidebar({ isOpen, onClose, cart, onRemove, onAdd, onClearCart, onDelete }) {

    const sendWhatsApp = () => {
        const phone = "573104771202";
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

        let message = "🤠 *Nuevo Pedido - Ganadero Agrodistribuciones*\n";
        message += "------------------------------------------\n\n";

        cart.forEach(item => {
            message += `✅ *${item.quantity}* x ${item.name}\n`;
            message += `   _Presentación: ${item.selectedPres}_\n`;
            message += `   _Lab: ${item.laboratory}_\n\n`;
        });

        message += "------------------------------------------\n";
        message += `📦 *Total de productos:* ${totalItems}\n\n`;
        message += "¿Me podrían confirmar disponibilidad y precios? Gracias.";

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>

            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <div className="cart-title">
                        <h3>Mi Pedido</h3>
                        <span className="cart-count">{cart.length} productos</span>
                    </div>
                    
                    <div className="header-actions">
                        {cart.length > 0 && (
                            <button className="clear-all-btn" onClick={onClearCart}>
                                Vaciar 🗑️
                            </button>
                        )}
                        <button className="close-cart" onClick={onClose}>&times;</button>
                    </div>
                </div>

                <div className="cart-content">
                    {cart.length === 0 ? (
                        <div className="empty-cart-container">
                            <span className="empty-icon">🛒</span>
                            <p className="empty-msg">Tu lista de interés está vacía.</p>
                            <button className="back-btn" onClick={onClose}>Volver al catálogo</button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-img" />

                                <div className="item-info">
                                    <h4>{item.name}</h4>
                                    <small>{item.laboratory} | 🏷️ {item.selectedPres}</small>
                                    <div className="item-controls">
                                        <button className="control-btn" onClick={() => onRemove(item.id, item.selectedPres)}>−</button>
                                        <span className="quantity-num">{item.quantity}</span>
                                        <button className="control-btn" onClick={() => onAdd(item)}>+</button>
                                    </div>
                                </div>

                            
                                <button 
                                    className="delete-item-btn" 
                                    onClick={() => onDelete(item.id, item.selectedPres)} 
                                    title="Eliminar producto"
                                >
                                    <svg 
                                        viewBox="0 0 24 24" 
                                        width="20" 
                                        height="20" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        fill="none" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary">
                            <span>Total de unidades:</span>
                            <strong>{cart.reduce((a, b) => a + b.quantity, 0)}</strong>
                        </div>
                        <button className="whatsapp-send-btn" onClick={sendWhatsApp}>
                            Enviar Pedido por WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}