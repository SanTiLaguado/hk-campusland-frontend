import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/AuthService';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {

    const performLogout = async () => {
      try {
        await logout();
        localStorage.removeItem('token');
        navigate('/login');
      } catch (err) {
        console.error("Error durante el cierre de sesión:", err);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div>
      <p>Cerrando sesión...</p>
    </div>
  );
}
