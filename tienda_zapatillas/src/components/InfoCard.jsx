import { useContext } from "react";
import { Card } from "react-bootstrap";
import { TemaContext } from "../context/TemaContext";
import "../style/InfoCard.css"; 

function InfoCard({ titulo, descripcion }) {
  const { modoOscuro } = useContext(TemaContext);

  return (
    <Card
      className={`info-card h-100 border-0 shadow-sm rounded-4 transition-all ${
        modoOscuro
          ? "bg-dark text-white border-secondary"
          : "bg-white text-dark"
      }`}
    >
      <Card.Body className="p-4 d-flex flex-column justify-content-center text-center text-md-start">
        {/* Título de la tarjeta */}
        <Card.Title className="fw-bold text-uppercase tracking-wide mb-3 fs-4 info-card-title">
          {titulo}
        </Card.Title>

        
        <div className="divider-line mb-3"></div>

        {/* Descripción / Contenido */}
        <Card.Text
          className={`fs-6 info-card-text ${modoOscuro ? "text-white-50" : "text-muted"}`}
        >
          {descripcion}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
