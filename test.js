import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"; //librería de github 

// Configuración de la prueba
export let options = {
  stages: [
    { duration: '30s', target: 20 },  // Subir a 20 usuarios en 30 segundos
    { duration: '1m', target: 50 },   // Subir a 50 usuarios en 1 minuto
    { duration: '1m', target: 100 },  // Subir a 100 usuarios en 1 minuto
    { duration: '2m', target: 100 },  // Mantener 100 usuarios durante 2 minutos
    { duration: '1m', target: 50 },   // Reducir a 50 usuarios en 1 minuto
    { duration: '30s', target: 0 },   // Reducir a 0 usuarios en 30 segundos
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% de las solicitudes deben responder en menos de 1 segundo
    http_req_failed: ['rate<0.01'], // Menos del 1% de las solicitudes pueden fallar
  },
};

export default function () {
  // URL del endpoint
  const url = 'https://api.teamtrack.acc.op.quind.io/employee/';

  // Encabezados
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDYWxpZGFkIiwiZXhwIjoxNzM0MTkzMjA3fQ.THOPsNuCzinuPqFI-qZYPyNXFNykC0iptZbX2P4-ymA', // Reemplaza con tu token válido
    },
  };

  // Generar datos únicos
  const uniqueDocument = `${Math.floor(100000000 + Math.random() * 900000000)}`; // Documento único de 9 dígitos

  // Body de la solicitud
  const payload = JSON.stringify({
    name: 'AlejoPrueba',
    document: uniqueDocument,
    user_id: 2,
    employee_profile_id: 2,
    team_ids: [6],
    is_assignable: false,
    date_of_joining: '2024-09-01 00:00:00',
  });

  // Realizar la solicitud POST
  const res = http.post(url, payload, params);

  // Imprimir respuestas para depuración
  console.log(`Response status: ${res.status}`);
  console.log(`Response body: ${res.body}`);
  console.log(`Response headers: ${JSON.stringify(res.headers)}`);
  console.log(`Generated document: ${uniqueDocument}`);

  // Validar respuesta
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1s': (r) => r.timings.duration < 1000,
  });

  sleep(1); // Pausa de 1 segundo entre solicitudes
}

export function handleSummary(data) {

  return {
    "requestConfigReport.html": htmlReport(data),
  };
}