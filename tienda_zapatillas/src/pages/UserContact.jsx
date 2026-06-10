import { useState, useEffect, useContext } from "react";
import {
  Form,
  Button,
  Card,
  InputGroup,
  Alert,
  Container,
} from "react-bootstrap";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiMap,
  FiTruck,
  FiMessageSquare,
  FiEdit2,
  FiCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import "../style/LoginForm.css";

function UserContact() {
  const [usuarios, setUsuarios] = useState([]);

  // Traemos los datos del usuario logueado directamente del contexto global
  const { usuario: usuarioLogueado, login } = useContext(LoginContext);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    localidad: "",
    metodoEntrega: "domicilio",
    mensaje: "",
  });

  const [editando, setEditando] = useState({
    nombre: false,
    email: false,
    telefono: false,
    direccion: false,
    localidad: false,
    metodoEntrega: false,
    mensaje: false,
  });

  const [alerta, setAlerta] = useState({
    mostrar: false,
    tipo: "",
    mensaje: "",
  });

  //  Sincronizamos el formulario con el contexto global apenas se monta o cambia el usuario
  useEffect(() => {
    const todosLosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(todosLosUsuarios);

    if (usuarioLogueado) {
      setForm({
        nombre: usuarioLogueado.nombre || "",
        email: usuarioLogueado.email || "",
        telefono: usuarioLogueado.telefono || "",
        direccion: usuarioLogueado.direccion || "",
        localidad: usuarioLogueado.localidad || "",
        metodoEntrega: usuarioLogueado.metodoEntrega || "domicilio",
        mensaje: usuarioLogueado.mensaje || "",
      });
    }
  }, [usuarioLogueado]);

  const handleChange = (e) => {
    const targetValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: targetValue });
  };

  const toggleEditar = (campo) => {
    setEditando({ ...editando, [campo]: !editando[campo] });
  };

  const huboCambios =
    usuarioLogueado &&
    (form.nombre.trim() !== (usuarioLogueado.nombre || "") ||
      form.email.toLowerCase().trim() !== (usuarioLogueado.email || "") ||
      form.telefono.trim() !== (usuarioLogueado.telefono || "") ||
      form.direccion.trim() !== (usuarioLogueado.direccion || "") ||
      form.localidad.trim() !== (usuarioLogueado.localidad || "") ||
      form.metodoEntrega !== (usuarioLogueado.metodoEntrega || "domicilio") ||
      form.mensaje.trim() !== (usuarioLogueado.mensaje || ""));

  const handleGuardarCambios = (e) => {
    e.preventDefault();

    if (
      !form.nombre.trim() ||
      !form.email.trim() ||
      !form.telefono.trim() ||
      !form.direccion.trim() ||
      !form.localidad.trim()
    ) {
      setAlerta({
        mostrar: true,
        tipo: "danger",
        mensaje: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    const datosActualizados = {
      ...usuarioLogueado,
      nombre: form.nombre.trim(),
      email: form.email.toLowerCase().trim(),
      telefono: form.telefono.trim(),
      direccion: form.direccion.trim(),
      localidad: form.localidad.trim(),
      metodoEntrega: form.metodoEntrega,
      mensaje: form.mensaje.trim(),
    };

    const usuariosActualizados = usuarios.map((u) => {
      if (u.id === usuarioLogueado.id) {
        return { ...datosActualizados, isLoggedIn: true };
      }
      return u;
    });

    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
    setUsuarios(usuariosActualizados);

    login(datosActualizados);

    setEditando({
      nombre: false,
      email: false,
      telefono: false,
      direccion: false,
      localidad: false,
      metodoEntrega: false,
      mensaje: false,
    });

    setAlerta({
      mostrar: true,
      tipo: "success",
      mensaje: "¡Cambios aplicados con éxito!",
    });
    setTimeout(() => setAlerta({ ...alerta, mostrar: false }), 4000);
  };

  // --- Si no inició sesión ---
  if (!usuarioLogueado) {
    return (
      <Container
        className="d-flex align-items-center justify-content-center "
        style={{ minHeight: "70vh" }}
      >
        <Card
          className="shadow-sm border-0 p-4 text-center rounded-4 mx-auto border-naranja-personalizado "
          style={{ maxWidth: "450px" }}
        >
          <Card.Body>
            <div className="mb-4 ">
              <FiUser size={50} className="text-muted mb-3" />
              <h4 className="fw-bold text-dark">Acceso Restringido</h4>
              <p className="text-muted small">
                Para ver y gestionar tus datos de contacto, necesitas estar
                identificado en nuestra plataforma.
              </p>
            </div>
            <Alert variant="warning" className="small fw-semibold py-2">
              Inicia sesión o regístrate para continuar.
            </Alert>
            <div className="d-flex gap-2 justify-content-center mt-4">
              <Link
                to="/login"
                className="btn btn-orange  btn-login-main px-4 rounded-3 border-orange text-orange fw-bold"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="btn btn-orange btn-login-main px-4 rounded-3 border-orange text-orange fw-bold"
              >
                Registrarse
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // --- Formulario de perfil con datos cargados ---
  return (
    <Container className="py-5">
      {alerta.mostrar && (
        <Alert
          variant={alerta.tipo}
          className="mb-3 mx-auto"
          style={{ maxWidth: "560px" }}
          onClose={() => setAlerta({ ...alerta, mostrar: false })}
          dismissible
        >
          {alerta.mensaje}
        </Alert>
      )}

      <Card
        className="shadow-sm border-naranja-personalizado rounded-4 p-4 mx-auto login-card"
        style={{ maxWidth: "560px" }}
      >
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-1 login-title">Mis Datos de Contacto</h2>
            <p className="text-muted small px-3">
              Gestioná tu información de envío y contacto para tus pedidos de
              TRIATLON.
            </p>
          </div>

          <Form onSubmit={handleGuardarCambios} noValidate>
            {/* Campo: Nombre */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-secondary small">
                Nombre Completo
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={!editando.nombre}
                  className="border-start-0 ps-1 bg-light-disabled"
                />
                <Button
                  variant={editando.nombre ? "success" : "outline-secondary"}
                  onClick={() => toggleEditar("nombre")}
                  className="px-3"
                >
                  {editando.nombre ? (
                    <FiCheck className="text-white" />
                  ) : (
                    <FiEdit2 />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Campo: Email */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-secondary small">
                Correo Electrónico
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiMail />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!editando.email}
                  className="border-start-0 ps-1"
                />
                <Button
                  variant={editando.email ? "success" : "outline-secondary"}
                  onClick={() => toggleEditar("email")}
                >
                  {editando.email ? (
                    <FiCheck className="text-white" />
                  ) : (
                    <FiEdit2 />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Campo: Teléfono */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-secondary small">
                Teléfono
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiPhone />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  disabled={!editando.telefono}
                  className="border-start-0 ps-1"
                />
                <Button
                  variant={editando.telefono ? "success" : "outline-secondary"}
                  onClick={() => toggleEditar("telefono")}
                >
                  {editando.telefono ? (
                    <FiCheck className="text-white" />
                  ) : (
                    <FiEdit2 />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Campo: Dirección */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-secondary small">
                Dirección
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiMapPin />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  disabled={!editando.direccion}
                  className="border-start-0 ps-1"
                />
                <Button
                  variant={editando.direccion ? "success" : "outline-secondary"}
                  onClick={() => toggleEditar("direccion")}
                >
                  {editando.direccion ? (
                    <FiCheck className="text-white" />
                  ) : (
                    <FiEdit2 />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Campo: Localidad */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-secondary small">
                Localidad
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiMap />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="localidad"
                  value={form.localidad}
                  onChange={handleChange}
                  disabled={!editando.localidad}
                  className="border-start-0 ps-1"
                />
                <Button
                  variant={editando.localidad ? "success" : "outline-secondary"}
                  onClick={() => toggleEditar("localidad")}
                >
                  {editando.localidad ? (
                    <FiCheck className="text-white" />
                  ) : (
                    <FiEdit2 />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Campo: Método de Entrega */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-secondary small">
                Método de Entrega
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiTruck />
                </InputGroup.Text>
                <Form.Select
                  name="metodoEntrega"
                  value={form.metodoEntrega}
                  onChange={handleChange}
                  disabled={!editando.metodoEntrega}
                  className="border-start-0 ps-1"
                >
                  <option value="domicilio">Envío a Domicilio</option>
                  <option value="retiro">Retiro en Punto de Venta</option>
                </Form.Select>
                <Button
                  variant={
                    editando.metodoEntrega ? "success" : "outline-secondary"
                  }
                  onClick={() => toggleEditar("metodoEntrega")}
                >
                  {editando.metodoEntrega ? (
                    <FiCheck className="text-white" />
                  ) : (
                    <FiEdit2 />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Campo: Mensaje Aclaratorio */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-secondary small">
                Aclaraciones de Entrega
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted align-items-start pt-2">
                  <FiMessageSquare />
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  disabled={!editando.mensaje}
                  className="border-start-0 ps-1"
                />
                <Button
                  variant={editando.mensaje ? "success" : "outline-secondary"}
                  onClick={() => toggleEditar("mensaje")}
                  className="align-items-start"
                >
                  {editando.mensaje ? (
                    <FiCheck className="text-white mt-1" />
                  ) : (
                    <FiEdit2 className="mt-1" />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Botón Aplicar Cambios */}
            <Button
              type="submit"
              disabled={!huboCambios}
              className={`w-100 fw-bold py-2 mb-2 d-flex align-items-center justify-content-center gap-2 border-0 rounded-3 btn-login-main ${!huboCambios ? "bg-secondary opacity-50" : "login-btn-submit"}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              APLICAR CAMBIOS
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserContact;
