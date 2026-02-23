import "../styles/About.css";

export default function About() {
  return (
    <section className="about-section" id="nosotros">
      <div className="about-container">
        <div className="about-text">
          <span className="subtitle">Nuestra Historia</span>
          <h2>Ganadero Agrodistribuciones S.A.S</h2>
          <p>
            Somos una empresa líder en la distribución de medicamentos veterinarios 
            ,comprometidos con el desarrollo del campo colombiano. 
            Contamos con una amplia trayectoria brindando soluciones de salud 
            animal con los más altos estándares de calidad.
          </p>
          
          <div className="about-stats">
            <div className="stat-item">
              <h3>+20</h3>
              <p>Laboratorios Aliados</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Calidad Garantizada</p>
            </div>
            <div className="stat-item">
              <h3>Asesoría</h3>
              <p>Especializada</p>
            </div>
          </div>
        </div>

        <div className="about-mission">
          <div className="mission-card">
            <h3>Misión</h3>
            <p>Ganadero Agrodistribuciones S.A.S. Es una empresa dedicada a la venta y distribución de medicamentos veterinarios para la salud animal.
              Así mismo,esta enfocada en ofrecer a nuestros clientes, la solucipon mas adecuada atravez de productos y servicios de calidad.
            </p>
          </div>
          <div className="mission-card">
            <h3>Visión</h3>
            <p>Fortalecer el canal minorista de veterinarias, brindando un servicio excelente y un amplio surtido de productos a precios competitivos y justos,
              trabajando de manera permanente en la construcción y mantenimiento de un equipo comprometido y altamente motivado con los objetivos de la empresa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}