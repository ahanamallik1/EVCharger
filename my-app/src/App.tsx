import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimulationConfigForm from './components/SimulationConfigForm';
import ResultsDashboard from './components/ResultsDashboard';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import SimulationMultiConfigForm from './components/SimulationMultiConfigForm';
import ChargingStationResultsDashboard from './components/ChargingStationResultsDashboard';
import NotFound from './components/NotFound';
import Concurrency from './components/Concurreny';

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        {/* Navbar is displayed at the top of every page */}
        <Navbar />
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
          {/* Route for configuring simulation parameters */}
          <Route path="/configure" element={<SimulationConfigForm />} />
          {/* Protected route and results dashboard for uniform charge points */}
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <ResultsDashboard />
              </ProtectedRoute>
            }
          />
          {/* Route for configuring multiple charge type simulation parameters */}
          <Route
            path="/configureMulti"
            element={<SimulationMultiConfigForm />}
          />
          {/* Protected route and results dashboard for mixed charge points */}
          <Route
            path="/chargingStationResults"
            element={
              <ProtectedRoute>
                <ChargingStationResultsDashboard />
              </ProtectedRoute>
            }
          />
          {/* concurrency deviation */}
          <Route path="/concurrency" element={<Concurrency />} />
          {/* if user types wrong route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
