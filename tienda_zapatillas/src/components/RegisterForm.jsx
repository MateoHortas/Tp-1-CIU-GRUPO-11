import { Form, Button, Row, Col, Card, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUserPlus,
  FiPhone,
  FiMapPin,
  FiMap,
  FiTruck,
  FiMessageSquare,
} from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri"; 
import Alert from "react-bootstrap/Alert";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../style/LoginForm.css"; 
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
    telefono: "",
    direccion: "",
    localidad: "",
    metodoEntrega: "domicilio",
    mensaje: "",
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

    // Email repetido
    const emailExiste = usuarios.some(
      (u) => u.email.toLowerCase() === form.email.toLowerCase(),
    );
    if (emailExiste) {
      nuevosErrores.email = "Este email ya está registrado";
    }

    // Teléfono obligatorio (Validación de solo números básica u opcional)
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    } else if (!/^[0-9+\s-]+$/.test(form.telefono)) {
      nuevosErrores.telefono = "Número de teléfono inválido";
    }

    // Dirección obligatoria
    if (!form.direccion.trim()) {
      nuevosErrores.direccion = "La dirección es obligatoria";
    }

    // Localidad obligatoria
    if (!form.localidad.trim()) {
      nuevosErrores.localidad = "La localidad es obligatoria";
    }

    // Password
    if (form.password.length < 6) {
      nuevosErrores.password = "Mínimo 6 caracteres";
    }

    // Confirmar password
    if (form.password !== form.confirmPassword) {
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden";
    }

    // Términos y condiciones
    if (!form.acceptTerms) {
      nuevosErrores.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarForm()) return;

    // Crear nuevo usuario con los campos añadidos
    const nuevoUsuario = {
      id: Date.now(),
      nombre: form.nombre.trim(),
      email: form.email.toLowerCase(),
      telefono: form.telefono.trim(),
      direccion: form.direccion.trim(),
      localidad: form.localidad.trim(),
      metodoEntrega: form.metodoEntrega,
      mensaje: form.mensaje.trim(),
      password: form.password,
      acceptTerms: form.acceptTerms,
      isLoggedIn: false,
    };

    // Guardar en array y localStorage
    const nuevosUsuarios = [...usuarios, nuevoUsuario];
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

    console.log("Usuario registrado con envío:", nuevoUsuario);

    // Limpiar form restableciendo los valores iniciales vacíos
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      localidad: "",
      metodoEntrega: "domicilio",
      mensaje: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    });

    setErrors({});
    setRegistroOK(true);
    setTimeout(() => setRegistroOK(false), 3000);
  };

  const passwordsCoinciden =
    form.password === form.confirmPassword && form.password.length > 0;

  return (
    <>
      {registroOK && (
        <Alert variant="success" className="mb-3">
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
              <Form.Label className="fw-semibold text-secondary small">
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

            {/* Teléfono */}
            <Form.Group className="mb-3" controlId="registerPhone">
              <Form.Label className="fw-semibold text-secondary small">
                Teléfono de Contacto
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiPhone />
                </InputGroup.Text>
                <Form.Control
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  placeholder="Ej. 11 2345-6789"
                  className="border-start-0 ps-1"
                  isInvalid={!!errors.telefono}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.telefono}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Dirección y Localidad  */}
            
            <Form.Group className="mb-3" controlId="registerAddress">
              <Form.Label className="fw-semibold text-secondary small">
                Dirección (Calle y Altura)
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiMapPin />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  placeholder="Ej. Av. Siempreviva 742"
                  className="border-start-0 ps-1"
                  isInvalid={!!errors.direccion}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.direccion}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerLocation">
              <Form.Label className="fw-semibold text-secondary small">
                Localidad
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted">
                  <FiMap />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="localidad"
                  value={form.localidad}
                  placeholder="Ej. Morón"
                  className="border-start-0 ps-1"
                  isInvalid={!!errors.localidad}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.localidad}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          
            {/* Método de Entrega */}
            <Form.Group className="mb-3" controlId="registerDelivery">
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
                  className="border-start-0 ps-1"
                >
                  <option value="domicilio">Envío a Domicilio</option>
                  <option value="retiro">Retiro en Punto de Venta</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>

            {/* Mensaje o Aclaración Opcional */}
            <Form.Group className="mb-3" controlId="registerMessage">
              <Form.Label className="fw-semibold text-secondary small">
                Mensaje o Aclaración{" "}
                <span className="text-muted fw-normal">(Opcional)</span>
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
                  placeholder="Ej. Timbre B, dejar en portería, etc."
                  className="border-start-0 ps-1"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            {/* Contraseña */}
            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label className="fw-semibold text-secondary small">
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
            <Form.Group className="mb-3" controlId="registerConfirmPassword">
              <Form.Label className="fw-semibold text-secondary small">
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
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Checkbox Términos y Condiciones */}
            <Form.Group className="mb-4" controlId="registerTerms">
              <Form.Check
                type="checkbox"
                name="acceptTerms"
                className="small text-muted"
                onChange={handleChange}
                isInvalid={!!errors.acceptTerms}
                feedback={errors.acceptTerms}
                feedbackType="invalid"
                required
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
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              CREAR CUENTA <FiUserPlus />
            </Button>
          </Form>

          {/* Divisor */}
          <div className="position-relative text-center my-4">
            <hr className="text-muted" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted fw-semibold login-divider-text">
               REGISTRATE CON
            </span>
          </div>

         
          <Row className="g-3 mb-4">
            <Col xs={12}>
              <Button
                variant="outline-secondary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 bg-transparent text-dark border-light-subtle py-2 small fw-semibold"
              >
                <FcGoogle size={18} /> Google
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
              Iniciar sesión
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default RegisterForm;
