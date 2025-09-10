import { evaluarSolicitud } from '../domain/tarea6';

describe('evaluarSolicitud', () => {
  // Pruebas para condiciones de rechazo inmediato
  test('debería rechazar si moraActiva es verdadera', () => {
    const solicitud = {
      score: 700,
      moraActiva: true,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  test('debería rechazar si el score es menor a 600', () => {
    const solicitud = {
      score: 599,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  // Pruebas para reglas base: ingresosVerificados y dti
  test('debería rechazar si ingresosVerificados es falso y no es estudiante sin garante', () => {
    const solicitud = {
      score: 700,
      moraActiva: false,
      ingresosVerificados: false,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  test('debería rechazar si dti es mayor a 35 y no es estudiante sin garante', () => {
    const solicitud = {
      score: 700,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 36,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  test('no debería rechazar a estudiante con garante aunque ingresosVerificados sea falso', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: false,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('no debería rechazar a estudiante con garante aunque dti sea mayor a 35', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 36,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  // Pruebas para condiciones específicas de perfil: estudiante
  test('debería aprobar a estudiante con garante y score >= 650', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('debería rechazar a estudiante con garante pero score < 650', () => {
    const solicitud = {
      score: 649,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  test('debería rechazar a estudiante sin garante', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  // Pruebas para condiciones específicas de perfil: empleado
  test('debería aprobar a empleado con antiguedadMeses >= 6 y score >= 650', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 6,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('debería rechazar a empleado con antiguedadMeses < 6', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 5,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  test('debería rechazar a empleado con score < 650', () => {
    const solicitud = {
      score: 649,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 6,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  // Pruebas para condiciones específicas de perfil: independiente
  test('debería aprobar a independiente con antiguedadMeses >= 12 y score >= 670', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('debería rechazar a independiente con antiguedadMeses < 12', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 11,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  test('debería rechazar a independiente con score < 670', () => {
    const solicitud = {
      score: 669,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  // Pruebas para condiciones específicas de perfil: retirado
  test('debería aprobar a retirado con score >= 640', () => {
    const solicitud = {
      score: 640,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'retirado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('debería rechazar a retirado con score < 640', () => {
    const solicitud = {
      score: 639,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'retirado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  // Pruebas para condiciones de borde
  test('debería rechazar en el límite de score de 600', () => {
    const solicitud = {
      score: 600,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('No aprobado');
  });

  test('debería aprobar a empleado en el límite de antiguedadMeses de 6', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 6,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('debería aprobar a independiente en el límite de antiguedadMeses de 12', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('debería aprobar a estudiante en el límite de score de 650', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('debería aprobar a retirado en el límite de score de 640', () => {
    const solicitud = {
      score: 640,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'retirado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('debería aprobar a independiente en el límite de score de 670', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('no debería rechazar en el límite de dti de 35', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 35,
      antiguedadMeses: 6,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });
});