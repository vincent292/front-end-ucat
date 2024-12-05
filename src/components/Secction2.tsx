import React from "react";
import  "../Styles/Secction.css";

function Secction2() {
  return (
    <section  className="about-section">
     <div className="cards">
    <div className="card red">
        <p className="tip">Kinder</p>
    </div>
    <div className="card blue">
        <p className="tip">Primaria</p>
    </div>
    <div className="card green">
        <p className="tip">Secundaria</p>   
    </div>
</div>
<div className="cards">
    <div className="card red">
        <p className="tip">internacionalización</p>      
    </div>
    <div className="card blue">
        <p className="tip">Intercambios</p>
    </div>
    <div className="card green">
        <p className="tip">Nacional</p>   
    </div>
    </div>
    </section>
  );
}

export default Secction2;
