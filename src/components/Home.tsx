import React, { useState } from "react";
import "../Styles/index.css";
import Secction2 from "../components/Secction2";
import photo1 from "../media/photo1.webp";
import photo2 from "../media/photo2.webp";
import photo3 from "../media/photo3.webp";


const Home = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMouseEnter = (menuId: string) => {
    setOpenDropdown(menuId);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      <header>
        <div className="header-container">
          <nav className="header-nav">
            {/* Menú: Quienes Somos */}
            <div
              className="menu-item"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <a className="menu-link">Quienes Somos</a>
              {openDropdown === "about" && (
                <ul className="dropdown">
                  <li>
                    <a href="#history">Nuestra Historia</a>
                  </li>
                  <li>
                    <a href="#mission">Misión</a>
                  </li>
                  <li>
                    <a href="#team">Equipo</a>
                  </li>
                </ul>
              )}
            </div>

            {/* Menú: Nuestros Programas */}
            <div
              className="menu-item"
              onMouseEnter={() => handleMouseEnter("programs")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#programs-section" className="menu-link">
                Nuestros Programas
              </a>
              {openDropdown === "programs" && (
                <ul className="dropdown">
                  <li>
                    <a href="#online">Programas Online</a>
                  </li>
                  <li>
                    <a href="#in-person">Programas Presenciales</a>
                  </li>
                  <li>
                    <a href="#custom">Programas Personalizados</a>
                  </li>
                </ul>
              )}
            </div>

            {/* Menú: Características */}
            <div
              className="menu-item"
              onMouseEnter={() => handleMouseEnter("features")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#features-section" className="menu-link">
                Características
              </a>
              {openDropdown === "features" && (
                <ul className="dropdown">
                  <li>
                    <a href="#benefits">Beneficios</a>
                  </li>
                  <li>
                    <a href="#support">Soporte</a>
                  </li>
                  <li>
                    <a href="#financing">Financiamiento</a>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </header>

      <section id="hero-section" className="secction1">
        <div className="div_h1_1">
          <h1 className="h1_1">
            Aprende A tu manera
            <br />
          </h1>
        </div>

        <div className="div_h1_2">
          <h1 className="h1_2">
            Bachiller En humanidades
            <br />
          </h1>
        </div>

        <div className="div_h1_3">
          <h1 className="h1_3">
            secundaria
            <br />
          </h1>
        </div>
      </section>

      <Secction2 />

      <section id="programs-section" className="programs-section">
        <div className="programs-container">
          <h2>Nuestros Campus</h2>
          <div className="programs-list">
            <div className="card">
              <img
                src={photo1}
                alt="Card Image"
                className="card__image"
              />
              <div className="card__content">
                <p className="card__title">La Paz</p>
                <p className="card__description">
                Los colegios cuentan con un equipo de docentes capacitados que guían a los estudiantes en su aprendizaje, fomentando tanto su desarrollo intelectual como emocional. Además, suelen ofrecer una variedad de actividades extracurriculares, como deportes y arte, para complementar la formación integral de los estudiantes.
                </p>
              </div>
            </div>

            <div className="card">
              <img
                src={photo2}
                alt="Card Image"
                className="card__image"
              />
              <div className="card__content">
                <p className="card__title">Cochabamba</p>
                <p className="card__description">
                Una sucursal de un colegio es una extensión o unidad adicional de la institución principal, ubicada en otra zona geográfica para brindar acceso a la educación en un área diferente. Mantiene la misma filosofía educativa, programas académicos y estándares de calidad, permitiendo que más estudiantes se beneficien de los recursos y servicios de la institución sin tener que desplazarse grandes distancias.
                </p>
              </div>
            </div>
            <div className="card">
              <img
                src={photo3}
                alt="Card Image"
                className="card__image"
              />
              <div className="card__content">
                <p className="card__title">Santa Cruz</p>
                <p className="card__description">
                Una sucursal de un colegio es un establecimiento complementario a la sede principal que ofrece los mismos servicios educativos, pero en una ubicación alternativa. Está diseñada para atender a estudiantes de diferentes zonas, asegurando que la educación y los valores de la institución se mantengan consistentes y accesibles en diversas regiones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <section id="ready-section" className="ready-section">
        <h2>Listo para programar?</h2>
        <button className="ready-button">APLICÁ YA!</button>
      </section>
    </>
  );
};

export default Home;
