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

  useEffect(() => {
    const saved = localStorage.getItem('peceras');
    if (saved) setPeceras(JSON.parse(saved));
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h2>Monitoreo de Peceras</h2>
        <Link to="/agregar-pecera" className="btn-flotante">＋</Link>

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
    </div>
  );
};

export default DashboardPage;
