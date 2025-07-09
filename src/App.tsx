import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AlertasPage from './pages/AlertasPage';
import InformesPage from './pages/InformesPage';
import UsuarioPage from './pages/UsuarioPage';
import AgregarPeceraPage from './pages/AgregarPeceraPage';
import RutaPrivada from './components/RutaPrivada';
import DetalleAlertaPage from './pages/DetalleAlertaPage';
import DetallePeceraPage from './pages/DetallePeceraPage';
import PerfilDetallePage from './pages/PerfilDetallePage';
import InformeDetallePage from './pages/InformeDetallePage';
import NuevoInformePage from './pages/NuevoInformePage';
import './styles/variables.css';




function App() {
  return (
    <Routes>
      <Route path="/nuevo-informe" element={<RutaPrivada><NuevoInformePage /></RutaPrivada>} />
      <Route path="/informes" element={<RutaPrivada><InformesPage /></RutaPrivada>} />
      <Route path="/informe/:id" element={<RutaPrivada><InformeDetallePage /></RutaPrivada>} />
      <Route path="/perfil/:id" element={<RutaPrivada><PerfilDetallePage /></RutaPrivada>} />
      <Route path="/pecera/:id" element={<RutaPrivada><DetallePeceraPage /></RutaPrivada>} />
      <Route path="/alerta/:id" element={<RutaPrivada><DetalleAlertaPage /></RutaPrivada>} />
      <Route path="/reporte/:id" element={<RutaPrivada><DetallePeceraPage /></RutaPrivada>} />
      <Route path="/alerta/:id" element={<RutaPrivada><DetalleAlertaPage /></RutaPrivada>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<RutaPrivada><DashboardPage /></RutaPrivada>} />
      <Route path="/alertas" element={<RutaPrivada><AlertasPage /></RutaPrivada>} />
      <Route path="/informes" element={<RutaPrivada><InformesPage /></RutaPrivada>} />
      <Route path="/usuario" element={<RutaPrivada><UsuarioPage /></RutaPrivada>} />
      <Route path="/agregar-pecera" element={<RutaPrivada><AgregarPeceraPage /></RutaPrivada>} />
    </Routes>
  );
}

export default App;
