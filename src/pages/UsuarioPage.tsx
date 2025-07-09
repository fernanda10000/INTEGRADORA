import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/UsuarioPage.css';

interface Perfil {
  id: string;
  nombre: string;
  correo: string;
  password: string;
  fotoUrl: string;
}

const UsuarioPage: React.FC = () => {
  const [mostrarPerfilForm, setMostrarPerfilForm] = useState(false);
  const [mostrarPasswordForm, setMostrarPasswordForm] = useState(false);
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);

  const [nuevoPerfil, setNuevoPerfil] = useState({
    nombre: '',
    correo: '',
    password: '',
    fotoUrl: '',
  });

  useEffect(() => {
    const guardados = localStorage.getItem('perfiles');
    if (guardados) setPerfiles(JSON.parse(guardados));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('sesion');
    window.location.href = '/';
  };

  const agregarPerfil = () => {
    const nuevo: Perfil = {
      id: String(Date.now()),
      ...nuevoPerfil,
    };
    const actualizados = [...perfiles, nuevo];
    setPerfiles(actualizados);
    localStorage.setItem('perfiles', JSON.stringify(actualizados));
    setNuevoPerfil({ nombre: '', correo: '', password: '', fotoUrl: '' });
    setMostrarPerfilForm(false);
  };

  const cambiarPassword = () => {
    alert(`Contraseña actualizada: ${nuevaPassword}`);
    setNuevaPassword('');
    setMostrarPasswordForm(false);
  };

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoPerfil((prev) => ({ ...prev, fotoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="usuario-container">
      <Navbar />
      <div className="perfil-card">
        <div className="foto-perfil">📷<span>Foto de perfil</span></div>
        <h2>ADMIN</h2>

        <div className="opcion" onClick={() => setMostrarPasswordForm(true)}>🔒 Contraseñas</div>
       

        <p className="otros-label">Otros perfiles</p>
        {perfiles.map((p) => (
          <div key={p.id} className="perfil-secundario">
            {p.fotoUrl ? <img src={p.fotoUrl} alt="foto" className="mini-foto" /> : '👤'} {p.nombre}
          </div>
        ))}
        <div className="perfil-secundario" onClick={() => setMostrarPerfilForm(true)}>➕ Agregar otro perfil</div>

        <button className="cerrar-btn" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      {/* Formulario: Agregar perfil */}
      {mostrarPerfilForm && (
        <div className="modal-fondo">
          <div className="form-popup">
            <h3>Nuevo perfil</h3>
            <input type="text" placeholder="Nombre" value={nuevoPerfil.nombre} onChange={(e) => setNuevoPerfil({ ...nuevoPerfil, nombre: e.target.value })} />
            <input type="email" placeholder="Correo electrónico" value={nuevoPerfil.correo} onChange={(e) => setNuevoPerfil({ ...nuevoPerfil, correo: e.target.value })} />
            <input type="password" placeholder="Contraseña" value={nuevoPerfil.password} onChange={(e) => setNuevoPerfil({ ...nuevoPerfil, password: e.target.value })} />
            <input type="file" accept="image/*" onChange={handleFoto} />
            <button onClick={agregarPerfil}>Guardar perfil</button>
            <button onClick={() => setMostrarPerfilForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Formulario: Cambiar contraseña */}
      {mostrarPasswordForm && (
        <div className="modal-fondo">
          <div className="form-popup">
            <h3>Cambiar contraseña</h3>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
            />
            <button onClick={cambiarPassword}>Guardar</button>
            <button onClick={() => setMostrarPasswordForm(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuarioPage;
