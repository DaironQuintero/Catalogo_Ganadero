import "../styles/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>Ganadero Agrodistribuciones S.A.S</h3>
          <p>Distribuidor autorizado de productos veterinarios.</p>
        </div>

        <div className="footer-contact">
          <h4>Contacto</h4>
          <p>📍 Cra 11 # 12 - 01 Local1 , Tunja</p>
          <p>📞 +57 310 477 1202</p>
          <p>📧 ganadero_distribuciones@yahoo.com</p>
        </div>

        <div className="footer-social">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#" target="_blank">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Ganadero Agrodistribuciones S.A.S - Todos los derechos reservados.</p>
        <p>Powered by Dairon Quintero Moreno</p>
      </div>
    </footer>
  );
}