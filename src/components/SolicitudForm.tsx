import React, { useState } from 'react';
import { evaluarSolicitud } from '../domain/tarea6';
import 'bootstrap/dist/css/bootstrap.min.css';

const SolicitudForm: React.FC = () => {
  const [score, setScore] = useState<number | ''>('');
  const [moraActiva, setMoraActiva] = useState<boolean>(false);
  const [ingresosVerificados, setIngresosVerificados] = useState<boolean>(false);
  const [dti, setDti] = useState<number | ''>('');
  const [antiguedadMeses, setAntiguedadMeses] = useState<number | ''>('');
  const [perfil, setPerfil] = useState<'estudiante' | 'empleado' | 'independiente' | 'retirado'>('estudiante');
  const [garante, setGarante] = useState<boolean>(false);
  const [resultado, setResultado] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const solicitud = {
      score: score !== '' ? Number(score) : 0,
      moraActiva,
      ingresosVerificados,
      dti: dti !== '' ? Number(dti) : 0,
      antiguedadMeses: antiguedadMeses !== '' ? Number(antiguedadMeses) : 0,
      perfil,
      garante,
    };

    const resultadoEvaluacion = evaluarSolicitud(solicitud);
    setResultado(resultadoEvaluacion);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="card p-4 shadow-lg rounded-3" style={{ maxWidth: '500px', width: '100%' }}>
        <h1 className="card-title text-center fs-4 fw-bold mb-4 text-primary">Evaluar Solicitud</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="score" className="form-label">Score</label>
            <input
              type="number"
              className="form-control"
              id="score"
              value={score}
              onChange={(e) => setScore(e.target.value === '' ? '' : Number(e.target.value))}
              min="0"
              required
            />
            <div className="invalid-feedback">Por favor, ingresa un score válido.</div>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="moraActiva"
              checked={moraActiva}
              onChange={(e) => setMoraActiva(e.target.checked)}
            />
            <label htmlFor="moraActiva" className="form-check-label">Mora Activa</label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="ingresosVerificados"
              checked={ingresosVerificados}
              onChange={(e) => setIngresosVerificados(e.target.checked)}
            />
            <label htmlFor="ingresosVerificados" className="form-check-label">Ingresos Verificados</label>
          </div>

          <div className="mb-3">
            <label htmlFor="dti" className="form-label">DTI</label>
            <input
              type="number"
              className="form-control"
              id="dti"
              value={dti}
              onChange={(e) => setDti(e.target.value === '' ? '' : Number(e.target.value))}
              min="0"
              required
            />
            <div className="invalid-feedback">Por favor, ingresa un DTI válido.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="antiguedadMeses" className="form-label">Antigüedad en meses</label>
            <input
              type="number"
              className="form-control"
              id="antiguedadMeses"
              value={antiguedadMeses}
              onChange={(e) => setAntiguedadMeses(e.target.value === '' ? '' : Number(e.target.value))}
              min="0"
              required
            />
            <div className="invalid-feedback">Por favor, ingresa una antigüedad válida.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="perfil" className="form-label">Perfil</label>
            <select
              id="perfil"
              className="form-select"
              value={perfil}
              onChange={(e) => setPerfil(e.target.value as 'estudiante' | 'empleado' | 'independiente' | 'retirado')}
              required
            >
              <option value="estudiante">Estudiante</option>
              <option value="empleado">Empleado</option>
              <option value="independiente">Independiente</option>
              <option value="retirado">Retirado</option>
            </select>
            <div className="invalid-feedback">Por favor, selecciona un perfil.</div>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="garante"
              checked={garante}
              onChange={(e) => setGarante(e.target.checked)}
            />
            <label htmlFor="garante" className="form-check-label">Garante</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2" disabled={!(score && dti && antiguedadMeses)}>
            Evaluar
          </button>
        </form>

        <div className="mt-4 text-center">
          <h2 className="card-text fw-semibold">Resultado: {resultado}</h2>
        </div>
      </div>
    </div>
  );
};

export default SolicitudForm;