import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/AgregarPeceraPage.css';

const AgregarPeceraPage: React.FC = () => {
  const [formData, setFormData] = useState({
    sensor: '',
    ubicacion: '',
    conductividad: '',
    ph: '',
    temperatura: '',
    estado: 'Normal',
    fecha: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('peceras') || '[]');
    const updated = [...existing, formData];
    localStorage.setItem('peceras', JSON.stringify(updated));
    alert('¡Pecera agregada!');
    setFormData({
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
    <div className="agregar-container">
      <Navbar />
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Agregar nueva pecera</h2>

        <input name="sensor" placeholder="Sensor" value={formData.sensor} onChange={handleChange} required />
        <input name="ubicacion" placeholder="Ubicación" value={formData.ubicacion} onChange={handleChange} required />
        <input name="conductividad" placeholder="Conductividad" value={formData.conductividad} onChange={handleChange} required />
        <input name="ph" placeholder="Nivel de pH" value={formData.ph} onChange={handleChange} required />
        <input name="temperatura" placeholder="Temperatura (°C)" value={formData.temperatura} onChange={handleChange} required />
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="Normal">Normal</option>
          <option value="Alerta">Alerta</option>
        </select>
        <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} required />
        <button type="submit">Agregar Pecera</button>
      </form>
    </div>
  );
};

export default AgregarPeceraPage;
