import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/DetallePeceraPage.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const DetallePeceraPage: React.FC = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pecera, setPecera] = useState<any>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('peceras') || '[]');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const encontrada = data.find((p: any) => p.sensor === id);
    setPecera(encontrada);
  }, [id]);

  const chartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Nivel de pH',
        data: [7.2, 7.4, 7.6, 7.3, 7.5, 7.8, 7.6],
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0, 191, 255, 0.3)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Temperatura °C',
        data: [24.3, 24.5, 24.6, 24.4, 24.5, 24.8, 24.7],
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.3)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  if (!pecera) return <div className="detalle-container"><Navbar /><p style={{ padding: 20 }}>Pecera no encontrada</p></div>;

  return (
    <div className="detalle-container">
      <Navbar />
      <div className="detalle-content">
        <h2>Medición de la calidad del agua</h2>
        <p className="fecha">{pecera.fecha}</p>
        <span className={`etiqueta ${pecera.estado.toLowerCase()}`}>{pecera.estado}</span>

        <h3>Detalles de la medición</h3>
        <div className="datos-grid">
          <div><strong>Marca de tiempo:</strong><br />{pecera.fecha}</div>
          <div><strong>Conductividad:</strong><br />{pecera.conductividad} mg/L</div>
          <div><strong>Nivel de pH:</strong><br />{pecera.ph}</div>
          <div><strong>Temperatura del agua:</strong><br />{pecera.temperatura} °C</div>
          <div><strong>Identificación del sensor:</strong><br />{pecera.sensor}</div>
          <div><strong>Ubicación:</strong><br />{pecera.ubicacion}</div>
        </div>

        <h3>Análisis de tendencias</h3>
        <div className="grafico">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DetallePeceraPage;
