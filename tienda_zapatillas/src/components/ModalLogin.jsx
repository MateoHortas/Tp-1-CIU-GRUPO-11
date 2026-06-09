import { Modal, Button } from "react-bootstrap";
import "../style/Modal.css"


export function ModalLogin({ show, onHide, modoOscuro, onNavegar }) {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      contentClassName={modoOscuro ? "bg-secondary text-white border-0" : ""}
      className=".border-naranja-personalizado"
    >
      <Modal.Header closeButton variant={modoOscuro ? "white" : "dark"}>
        <Modal.Title className="fw-bold text-danger">⚠️ Inicio de sesión requerido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Para poder finalizar tu compra, necesitas estar registrado o haber iniciado sesión en tu cuenta de la tienda.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={() => onNavegar("/register") }className= "login-btn-submit btn-login-main">
          Registrarse
        </Button>
        <Button onClick={() => onNavegar("/login")}className= "login-btn-submit btn-login-main">
          Iniciar Sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
}