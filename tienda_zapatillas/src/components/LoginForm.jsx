import {
  Form,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useState, useEffect, useContext } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import "../style/LoginForm.css";

function LoginForm() {
  const { login, usuario } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loginOK, setLoginOK] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Cargar los usuarios registrados desde localStorage al iniciar
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(guardados);
  }, []);

  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setCredentials({
      ...credentials,
      [targetName]: targetValue,
    });

    // Limpia el error del campo actual mientras escribe
    setErrors({
      ...errors,
      [targetName]: "",
    });
    setLoginError(""); // Limpia error general de login
  };

  const validarForm = () => {
    const nuevosErrores = {};

    // Email formato
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(credentials.email)) {
      nuevosErrores.email = "Email inválido";
    }

    // Password longitud
    if (credentials.password.length < 6) {
      nuevosErrores.password = "Mínimo 6 caracteres";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Control seguro: si ya está conectado, frena el re-ingreso
    if (usuario && usuario.email) {
      setLoginError("Ya tienes una sesión activa en este dispositivo.");
      setTimeout(() => setLoginError(""), 4000);
      return;
    }

    if (!validarForm()) return;

    // Traemos usuarios de localStorage
    const usuariosFrescos = JSON.parse(localStorage.getItem("usuarios")) || [];

    //  Buscamos si el email existe
    const usuarioEncontrado = usuariosFrescos.find(
      (u) =>
        u.email &&
        u.email.toLowerCase().trim() === credentials.email.toLowerCase().trim(),
    );

    if (!usuarioEncontrado) {
      setLoginError("Este correo no se encuentra registrado.");
      setTimeout(() => setLoginError(""), 3000);
      return;
    }

    //  Verificamos la contraseña
    if (usuarioEncontrado.password !== credentials.password) {
      setLoginError("Contraseña incorrecta.");
      setTimeout(() => setLoginError(""), 3000);
      return;
    }

    // Login Exitoso: Modificamos la lista
    const usuariosActualizados = usuariosFrescos.map((u) => {
      if (
        u.email &&
        u.email.toLowerCase().trim() === credentials.email.toLowerCase().trim()
      ) {
        return { ...u, isLoggedIn: true };
      }
      return { ...u, isLoggedIn: false };
    });

    //  Guardamos
    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
    setUsuarios(usuariosActualizados);

    // Impactamos el Contexto Global de Autenticación
    login({
      ...usuarioEncontrado, // <-- Manda todos los campos del perfil actual
      nombre: usuarioEncontrado.nombre || usuarioEncontrado.email.split("@")[0],
      rol: usuarioEncontrado.rol || "user",
    });

    setLoginOK(true);
    setTimeout(() => setLoginOK(false), 3000);

    // Limpiamos campos
    setCredentials({ email: "", password: "", rememberMe: false });
    setErrors({});
  };

  return (
    <>
      {loginOK && (
        <Alert variant="success" className="mb-3 mx-auto login-card">
          ¡Ingreso exitoso! Bienvenido de vuelta.
        </Alert>
      )}

      {loginError && (
        <Alert variant="danger" className="mb-3 mx-auto login-card">
          {loginError}
        </Alert>
      )}

      <Card className="shadow-sm border-naranja-personalizado rounded-4 p-4 mx-auto login-card">
        <Card.Body>
          {/* Encabezado */}
          <div className="text-center mb-4 ">
            <div className="d-inline-flex align-items-center justify-content-center text-white rounded-circle mb-3 login-header-icon">
              <FiLogIn size={26} />
            </div>
            <h2 className="fw-bold mb-1 login-title">Bienvenido</h2>
            <p className="text-muted small px-3">
              Ingresa tus credenciales para acceder a tu cuenta deportiva.
            </p>
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label className="fw-semibold text-secondary small">
                Correo Electrónico
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiMail />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  value={credentials.email} // <-- Enlace de valor agregado
                  placeholder="ejemplo@triatlon.com"
                  className="border-start-0 ps-1"
                  onChange={handleChange}
                  isInvalid={!!errors.email} // <-- Validación agregada
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Contraseña */}
            <Form.Group className="mb-3" controlId="loginPassword">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <Form.Label className="fw-semibold text-secondary small mb-0">
                  Contraseña
                </Form.Label>
                <a
                  href="#forgot"
                  className="small fw-semibold text-decoration-none login-link"
                >
                  Olvidé mi contraseña
                </a>
              </div>
              <InputGroup hasValidation className="login-input-group">
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiLock />
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password} // <-- Enlace de valor agregado
                  className="border-start-0 border-end-0 ps-1"
                  onChange={handleChange}
                  isInvalid={!!errors.password} // <-- Validación agregada
                  required
                />
                <InputGroup.Text
                  className="bg-transparent border-start-0 text-muted"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Checkbox */}
            <Form.Group className="mb-4 " controlId="loginRemember">
              <Form.Check
                type="checkbox"
                name="rememberMe"
                checked={credentials.rememberMe}
                label="Recordar sesión en este dispositivo"
                className="small text-muted"
                onChange={handleChange}
              />
            </Form.Group>

            {/* Botón Iniciar Sesión */}
            <Button
              type="submit"
              className="w-100 fw-bold py-2 mb-4 d-flex align-items-center justify-content-center gap-2 border-0 rounded-3 login-btn-submit btn-login-main"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              INICIAR SESIÓN <FiLogIn />
            </Button>
          </Form>

          {/* Divisor */}
          <div className="position-relative text-center my-4">
            <hr className="text-muted" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted fw-semibold login-divider-text">
              O CONTINÚA CON
            </span>
          </div>

          {/* Redes Sociales */}
          <Row className="g-3 mb-4">
            <Col xs={12}>
              <Button
                variant="outline-secondary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 bg-transparent text-dark border-light-subtle py-2 small fw-semibold "
              >
                <FcGoogle size={18} /> Google
              </Button>
            </Col>
          </Row>

          {/* Enlace de Registro */}
          <div className="text-center small text-muted">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="fw-bold text-decoration-none login-link"
            >
              Crear cuenta
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default LoginForm;
