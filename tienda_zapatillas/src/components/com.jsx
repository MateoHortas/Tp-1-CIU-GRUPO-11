import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegistroForm() {
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
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [registroOK, setRegistroOK] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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
      password: form.password, // Ojo: en proyecto real esto va hasheado
    };

    // Guardar en array y localStorage
    const nuevosUsuarios = [...usuarios, nuevoUsuario];
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

    console.log("Usuario registrado:", nuevoUsuario);
    console.log("Todos los usuarios:", nuevosUsuarios);

    // Limpiar form y mostrar mensaje
    setForm({ nombre: "", email: "", password: "", confirmPassword: "" });
    setRegistroOK(true);
    setTimeout(() => setRegistroOK(false), 3000);
  };

  const passwordsCoinciden = form.password === form.confirmPassword && form.password.length > 0;

  return (
    <>
      {registroOK && (
        <Alert variant="success" className="mb-3">
          ¡Registro exitoso! Ya podés iniciar sesión
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            isInvalid={!!errors.nombre}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="juan@mail.com"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPass(!showPass)}
              type="button"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Repetir contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
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
              {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid"></Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Registrarse
        </Button>
      </Form>

      {/* Debug: para ver usuarios en consola del profe */}
      <small className="text-muted d-block mt-3">
        Usuarios registrados: {usuarios.length}
      </small>
    </>
  );
}

export default RegistroForm;
