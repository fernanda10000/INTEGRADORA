import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/DashboardPage.css';

interface Pecera {
  sensor: string;
  ubicacion: string;
  conductividad: string;
  ph: string;
  temperatura: string;
  estado: string;
  fecha: string;
}

const DashboardPage: React.FC = () => {
  const [peceras, setPeceras] = useState<Pecera[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nueva, setNueva] = useState<Pecera>({
    sensor: '',
    ubicacion: '',
    conductividad: '',
    ph: '',
    temperatura: '',
    estado: 'Normal',
    fecha: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('peceras');
    if (saved) setPeceras(JSON.parse(saved));
  }, []);

  const guardar = () => {
    const actualizadas = [...peceras, nueva];
    setPeceras(actualizadas);
    localStorage.setItem('peceras', JSON.stringify(actualizadas));
    setMostrarForm(false);
    setNueva({
      sensor: '',
      ubicacion: '',
      conductividad: '',
      ph: '',
      temperatura: '',
      estado: 'Normal',
      fecha: '',
    });
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h2>Monitoreo de Peceras</h2>
        <table>
          <thead>
            <tr>
              <th>Sensor</th>
              <th>Ubicación</th>
              <th>Conductividad</th>
              <th>pH</th>
              <th>Temperatura</th>
              <th>Estado</th>
              <th>Última Actualización</th>
            </tr>
          </thead>
          <tbody>
            {peceras.map((p, i) => (
              <tr key={i}>
                <td><Link to={`/reporte/${p.sensor}`}>{p.sensor}</Link></td>
                <td>{p.ubicacion}</td>
                <td>{p.conductividad}</td>
                <td>{p.ph}</td>
                <td>{p.temperatura} °C</td>
                <td className={p.estado === 'Alerta' ? 'estado-alerta' : 'estado-normal'}>{p.estado}</td>
                <td>{p.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario emergente para nueva pecera */}
      {mostrarForm && (
        <div className="modal-fondo">
          <div className="form-popup">
            <h3>Agregar nueva pecera</h3>
            <input placeholder="Sensor" value={nueva.sensor} onChange={e => setNueva({ ...nueva, sensor: e.target.value })} />
            <input placeholder="Ubicación" value={nueva.ubicacion} onChange={e => setNueva({ ...nueva, ubicacion: e.target.value })} />
            <input placeholder="Conductividad" value={nueva.conductividad} onChange={e => setNueva({ ...nueva, conductividad: e.target.value })} />
            <input placeholder="Nivel de pH" value={nueva.ph} onChange={e => setNueva({ ...nueva, ph: e.target.value })} />
            <input placeholder="Temperatura (°C)" value={nueva.temperatura} onChange={e => setNueva({ ...nueva, temperatura: e.target.value })} />
            <select value={nueva.estado} onChange={e => setNueva({ ...nueva, estado: e.target.value })}>
              <option>Normal</option>
              <option>Alerta</option>
            </select>
            <input type="datetime-local" value={nueva.fecha} onChange={e => setNueva({ ...nueva, fecha: e.target.value })} />
            <button onClick={guardar}>Guardar</button>
            <button onClick={() => setMostrarForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <button className="btn-flotante" onClick={() => setMostrarForm(true)}>➕</button>
    </div>
  );
};

export default DashboardPage;

