import { Form, Button, Row, Col, Card, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri"; // Ícono para confirmar contraseña
import Alert from "react-bootstrap/Alert";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import "../style/LoginForm.css"; // Reutilizamos los estilos base de colores y botones
import { Link } from "react-router-dom";

function RegisterForm() {
  const [usuarios, setUsuarios] = useState([]);
  // Cargar usuarios del localStorage al iniciar
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(guardados);
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [registroOK, setRegistroOK] = useState(false);

  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({
      ...form,
      [targetName]: targetValue,
    });

    setErrors({
      ...errors,
      [targetName]: "",
    });
  };

  const validarForm = () => {
    const nuevosErrores = {};

    // Nombre
    if (form.nombre.trim().length < 3) {
      nuevosErrores.nombre = "Mínimo 3 caracteres";
    } else if (!/^[a-zA-Záéíóúñ\s]+$/.test(form.nombre)) {
      nuevosErrores.nombre = "Solo letras y espacios";
    }

    // Email formato
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(form.email)) {
      nuevosErrores.email = "Email inválido";
    }

    // Email repetido - ESTA ES LA CLAVE
    const emailExiste = usuarios.some(
      (u) => u.email.toLowerCase() === form.email.toLowerCase(),
    );
    if (emailExiste) {
      nuevosErrores.email = "Este email ya está registrado";
    }

    // Password
    if (form.password.length < 6) {
      nuevosErrores.password = "Mínimo 6 caracteres";
    }

    // Confirmar password
    if (form.password !== form.confirmPassword) {
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden";
    }

    // Terminos y condiciones

    if (!form.acceptTerms) {
      nuevosErrores.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarForm()) return;

    // Crear nuevo usuario - NO guardes confirmPassword
    const nuevoUsuario = {
      id: Date.now(),
      nombre: form.nombre.trim(),
      email: form.email.toLowerCase(),
      password: form.password,
      acceptTerms: form.acceptTerms,
      isLoggedIn: false, // Ojo: en proyecto real esto va hasheado
    };

    // Guardar en array y localStorage
    const nuevosUsuarios = [...usuarios, nuevoUsuario];
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

    console.log("Usuario registrado:", nuevoUsuario);
    console.log("Todos los usuarios:", nuevosUsuarios);

    // Limpiar form y mostrar mensaje

    setForm({
      nombre: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    });

    //Limpiamos por completo el estado de errores para reiniciar la interfaz visual
    setErrors({});
    setRegistroOK(true);
    setTimeout(() => setRegistroOK(false), 3000);
  };

  const passwordsCoinciden =
    form.password === form.confirmPassword && form.password.length > 0;

  return (
    <>
      {registroOK && (
        <Alert className="" variant="success" className="mb-3">
          ¡Registro exitoso! Ya podés iniciar sesión
        </Alert>
      )}

      <Card className="shadow-sm border-naranja-personalizado rounded-4 p-4 mx-auto login-card">
        <Card.Body>
          {/* Encabezado */}
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-1 login-title">Únete a TRIATLON</h2>
            <p className="text-muted small px-3">
              Regístrate para obtener beneficios exclusivos y acceso anticipado.
            </p>
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            {/* Nombre Completo */}
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label
                className="fw-semibold text-secondary small "
                //style={{ fontSize: "0.75rem" }}
              >
                Nombre Completo
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  placeholder="Ej. Juan Pérez"
                  className="border-start-0 ps-1"
                  onChange={handleChange}
                  isInvalid={!!errors.nombre}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Correo Electrónico */}
            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label
                className="fw-semibold text-secondary small"
                //style={{ fontSize: "0.75rem" }}
              >
                Correo Electrónico
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiMail />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="ejemplo@email.com"
                  className="border-start-0 ps-1"
                  isInvalid={!!errors.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Contraseña y Confirmar Contraseña (En la misma fila con Row y Col) */}

            <Form.Group controlId="registerPassword">
              <Form.Label className="fw-bold text-secondary small">
                Contraseña
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiLock />
                </InputGroup.Text>
                <Form.Control
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  className="border-start-0 ps-1"
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  required
                  // Se pone rojo si las contraseñas no coinciden
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPass(!showPass)}
                  type="button"
                >
                  {showPass ? <FaEye /> : <FaEyeSlash />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Confirmar Contraseña */}

            <Form.Group controlId="registerConfirmPassword">
              <Form.Label className="fw-bold text-secondary small">
                Repetir contraseña
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <RiLockPasswordLine />
                </InputGroup.Text>
                <Form.Control
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  className="border-start-0 ps-1"
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                  isValid={passwordsCoinciden}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  type="button"
                >
                  {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
                </Button>
                {/* Muestra el error específico de coincidencia o el de campo vacío */}
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Checkbox Términos y Condiciones */}
            <Form.Group className="mb-4" controlId="registerTerms">
              <Form.Check
                hasValidation
                type="checkbox"
                name="acceptTerms"
                className="small text-muted"
                onChange={handleChange}
                isInvalid={!!errors.acceptTerms}
                feedback={errors.acceptTerms} // <-- AGREGA ESTO (Pasa el texto del error)
                feedbackType="invalid"
                required // Hace que marcarlo sea obligatorio para enviar
                label={
                  <span>
                    Acepto los{" "}
                    <a
                      href="#terminos"
                      className="fw-bold text-decoration-none login-link"
                    >
                      Términos y Condiciones
                    </a>
                    .
                  </span>
                }
              />
            </Form.Group>

            {/* Botón Crear Cuenta */}
            <Button
              type="submit"
              className="w-100 fw-bold py-2 mb-4 d-flex align-items-center justify-content-center gap-2 border-0 rounded-3 login-btn-submit btn-login-main"
            >
              CREAR CUENTA <FiUserPlus />
            </Button>
          </Form>

          {/* Divisor */}
          <div className="position-relative text-center my-4">
            <hr className="text-muted" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted fw-semibold login-divider-text">
              O REGÍSTRATE CON
            </span>
          </div>

          {/* Botones Sociales */}
          <Row className="g-3 mb-4">
            <Col xs={6}>
              <Button
                variant="outline-secondary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 bg-transparent text-dark border-light-subtle py-2 small fw-semibold"
              >
                <FcGoogle size={18} /> Google
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                variant="outline-secondary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 bg-transparent text-dark border-light-subtle py-2 small fw-semibold"
              >
                <FaApple size={18} className="text-dark" /> Apple
              </Button>
            </Col>
          </Row>

          {/* Enlace al Login */}
          <div className="text-center small text-muted">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="fw-bold text-decoration-none login-link"
            >
              Iniciar sesion
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default RegisterForm;
