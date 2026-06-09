import { Modal, Button, ListGroup } from "react-bootstrap";
import "../style/Modal.css";

export function ModalEnvio({
  show,
  onHide,
  usuario,
  modoOscuro,
  onConfirmar,
  onNavegar,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName={modoOscuro ? "bg-secondary text-white border-0" : ""}
      className=".border-naranja-personalizado"
    >
      <Modal.Header closeButton variant={modoOscuro ? "white" : "dark"}>
        <Modal.Title className="fw-bold text-success">
          {" "}
          Confirma tus datos de envio
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Por favor verifica que la dirección de entrega sea la correcta:</p>
        <ListGroup
          variant="flush"
          className={`border rounded p-2 ${modoOscuro ? "bg-dark text-white border-secondary" : "bg-light text-dark"}`}
        >
          <ListGroup.Item
            className={modoOscuro ? "bg-dark text-white border-secondary" : ""}
          >
            <strong>Dirección:</strong>{" "}
            {usuario?.direccion || "No especificada"}
          </ListGroup.Item>
          <ListGroup.Item
            className={modoOscuro ? "bg-dark text-white border-secondary" : ""}
          >
            <strong>Localidad:</strong>{" "}
            {usuario?.localidad || "No especificada"}
          </ListGroup.Item>
          <ListGroup.Item
            className={modoOscuro ? "bg-dark text-white border-0" : ""}
          >
            <strong>Aclaración:</strong>
            <span className="text-muted italic">
              {" "}
              "{usuario?.mensaje || "Sin observaciones"}"
            </span>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => onNavegar("/contacto")}
          className="fw-bold login-btn-submit btn-login-main"
        >
          Modificar Datos
        </Button>
        <Button
          onClick={onConfirmar}
          className="fw-bold login-btn-submit btn-login-main"
        >
          Finalizar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
