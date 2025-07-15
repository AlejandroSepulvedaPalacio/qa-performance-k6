import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '20s',
};

export default function () {
  // Simulate creating an employee
  http.get('https://test.k6.io'); // Replace with your actual endpoint for creating employees
  sleep(1);
}
