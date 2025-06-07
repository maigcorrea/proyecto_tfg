import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserrContext';
import { sendLoginData, setSessions } from '../services/authService';
import css from './FormLogin.module.css';

const FormLogin = () => {
  const { setUserSession } = useContext(UserContext);
  const navigate = useNavigate();
  
  // Estados
  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar iconos de Material Symbols
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_name=visibility,visibility_off';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('nickname', formData.nickname);
    formDataToSend.append('password', formData.password);

    try {
      const response = await sendLoginData(formDataToSend);
      
      if (response.success) {
        const sessionsResponse = await setSessions(formDataToSend);
        
        if (sessionsResponse.success) {
          setUserSession({
            id: sessionsResponse.id,
            usuario: sessionsResponse.usu,
            tipo: sessionsResponse.tipo,
            permiso: sessionsResponse.permiso
          });

          // Redirigir según el tipo de usuario
          if (sessionsResponse.tipo === "usu") {
            navigate("/");
          } else {
            navigate("/dashboard");
          }
          
          // Recargar la página después de 100ms para asegurar la navegación
          setTimeout(() => window.location.reload(), 100);
        } else {
          setError(sessionsResponse.message || 'Error al iniciar sesión');
        }
      } else {
        setError(response.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.loginContainer}>
      <div className={css.loginCard}>
        <header className={css.loginHeader}>
          <h1>Bienvenido de nuevo</h1>
          <p>Inicia sesión para continuar</p>
        </header>
        
        <form onSubmit={handleSubmit} className={css.loginForm}>
          {error && (
            <div className={css.errorMessage}>
              {error}
            </div>
          )}
          
          <div className={css.formGroup}>
            <label htmlFor="nickname">Usuario o correo electrónico</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className={css.formControl}
              placeholder="Ingresa tu usuario o email"
              required
            />
          </div>
          
          <div className={css.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="password">Contraseña</label>
              <a href="/forgot-password" className={css.forgotPassword}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className={css.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={css.formControl}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={css.togglePassword}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className={css.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
          
          <div className={css.loginFooter}>
            ¿No tienes una cuenta?{' '}
            <a href="/register">Regístrate</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;