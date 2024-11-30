import React, { useState } from "react";
import "../Styles/index.css";
import Secction2 from '../components/Secction2'


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
              <a  className="menu-link">
                Quienes Somos
              </a>
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
          <h2>Nuestros Programas</h2>
          <div className="programs-list">
            <div className="program-card">
              <div className="card-info">
                <h3>Programador Front-end</h3>
                <p className="title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt vero corporis incidunt saepe qui commodi quasi neque
                  veniam quam, aspernatur est beatae maxime animi sed reiciendis
                  mollitia ducimus veritatis repellendus?
                </p>
                <button className="program-button">+ Info</button>
              </div>
            </div>
            <div className="program-card">
              <div className="card-info">
                <h3>Programador Full-Stack</h3>
                <p className="title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt vero corporis incidunt saepe qui commodi quasi neque
                  veniam quam, aspernatur est beatae maxime animi sed reiciendis
                  mollitia ducimus veritatis repellendus?
                </p>
                <button className="program-button">+ Info</button>
              </div>
            </div>
            <div className="program-card">
              <div className="card-info">
                <h3>Programador Python</h3>
                <p className="title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt vero corporis incidunt saepe qui commodi quasi neque
                  veniam quam, aspernatur est beatae maxime animi sed reiciendis
                  mollitia ducimus veritatis repellendus?
                </p>
                <button className="program-button">+ Info</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features-section" className="features-section">
        <div className="features-container">
          <ul className="features-list">
            <li className="check">
              <span className="loader"></span>Flexibilidad de horarios
            </li>
            <li className="check">
              <span className="loader"></span>Soporte 1:1
            </li>
            <li className="check">
              <span className="loader"></span>100% online
            </li>
            <li className="check">
              <span className="loader"></span>Asistencia financiera
            </li>
          </ul>
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
