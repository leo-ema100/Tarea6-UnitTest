// src/App.tsx
import React from 'react';
import SolicitudForm from './components/SolicitudForm'; // Importa el componente que creamos

const App: React.FC = () => {
  return (
    <div className="App">
      <SolicitudForm />  {/* Usar el componente aquí */}
    </div>
  );
};

export default App;
