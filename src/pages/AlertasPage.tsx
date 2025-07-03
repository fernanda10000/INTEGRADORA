import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/AlertasPage.css';

interface Alerta {
  id: string;
  acuario: string;
  alerta: string;
  gravedad: 'Crítico' | 'Advertencia' | 'Información';
  fecha: string;
  admitido: boolean;
  icono: string;
}

const AlertasPage: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nueva, setNueva] = useState({
    acuario: '',
    alerta: '',
    gravedad: 'Información',
    fecha: '',
    admitido: false,
    icono: '🔔',
  });

  useEffect(() => {
    const guardadas = localStorage.getItem('alertas-tabla');
    if (guardadas) {
      setAlertas(JSON.parse(guardadas));
    }
  }, []);

  const guardar = () => {
    const nuevaAlerta: Alerta = {
      ...nueva,
      id: String(Date.now()),
    };
    const actualizadas = [...alertas, nuevaAlerta];
    setAlertas(actualizadas);
    localStorage.setItem('alertas-tabla', JSON.stringify(actualizadas));

    // También guardar en alertas-detalle
    const detalleActual = JSON.parse(localStorage.getItem('alertas-detalle') || '[]');
    localStorage.setItem('alertas-detalle', JSON.stringify([...detalleActual, {
      id: nuevaAlerta.id,
      titulo: nuevaAlerta.alerta,
      gravedad: nuevaAlerta.gravedad,
      fecha: nuevaAlerta.fecha,
      sensor: nuevaAlerta.acuario,
      tipo: 'pH',
      umbral: '6.5',
      actual: '7.2',
      reconocida: nuevaAlerta.admitido,
      imagen: '/pez-alerta.png'
    }]));

    setMostrarForm(false);
    setNueva({
      acuario: '',
      alerta: '',
      gravedad: 'Información',
      fecha: '',
      admitido: false,
      icono: '🔔',
    });
  };

  return (
    <div className="alertas-container">
      <Navbar />
      <div className="alertas-tabla-contenido">
        <h2 className="titulo-alerta">Alertas de Calidad del Agua</h2>

        {mostrarForm && (
          <div className="modal-fondo">
            <div className="form-popup">
              <h3>Nueva Alerta</h3>
              <input placeholder="Acuario" value={nueva.acuario} onChange={e => setNueva({ ...nueva, acuario: e.target.value })} />
              <input placeholder="Descripción" value={nueva.alerta} onChange={e => setNueva({ ...nueva, alerta: e.target.value })} />
              <select value={nueva.gravedad} onChange={e => setNueva({ ...nueva, gravedad: e.target.value as any })}>
                <option>Crítico</option>
                <option>Advertencia</option>
                <option>Información</option>
              </select>
              <input type="datetime-local" value={nueva.fecha} onChange={e => setNueva({ ...nueva, fecha: e.target.value })} />
              <label>
                <input type="checkbox" checked={nueva.admitido} onChange={e => setNueva({ ...nueva, admitido: e.target.checked })} />
                Admitido
              </label>
              <button onClick={guardar}>Guardar</button>
              <button onClick={() => setMostrarForm(false)}>Cancelar</button>
            </div>
          </div>
        )}

        <table className="tabla-alertas">
          <thead>
            <tr>
              <th>Acuario</th>
              <th>Alerta</th>
              <th>Gravedad</th>
              <th>Marca de Tiempo</th>
              <th>Admitido</th>
            </tr>
          </thead>
          <tbody>
            {alertas.map((a) => (
              <tr key={a.id}>
                <td>
                  <Link to={`/alerta/${a.id}`} className="alerta-link">
                    {a.acuario}
                  </Link>
                </td>
                <td>{a.icono} {a.alerta}</td>
                <td className={`nivel-${a.gravedad.toLowerCase()}`}>{a.gravedad}</td>
                <td>{a.fecha}</td>
                <td>{a.admitido ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón flotante al final del contenedor */}
      <button className="btn-flotante" onClick={() => setMostrarForm(true)}>➕</button>
    </div>
  );
};

export default AlertasPage;
