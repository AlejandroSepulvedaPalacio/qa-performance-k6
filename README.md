# qa-performance-k6

# 🚀 Prueba de Carga con K6

Este repositorio contiene un proyecto de prueba de rendimiento usando [K6](https://k6.io/). Se simula una carga sobre un servicio API para validar su estabilidad y tiempo de respuesta bajo demanda.

---

## 📁 Estructura del Proyecto

- `server.js`: Servidor local usado para pruebas de respuesta durante la carga.
- `k6pruebadecarga.js`: Script principal de prueba K6 que puede usarse como entrada para `k6 run`.
- `performance-test/`
  - `loastest.js`: Script alternativo de prueba.
  - `test.js`: Script complementario de pruebas de carga.
  - `requestConfigReport.html`: Reporte visual generado después de una ejecución.
  - `salida.log`: Log de ejecución con resultados detallados.

---

## 🧪 ¿Cómo ejecutar la prueba?

1. Asegúrate de tener [K6 instalado](https://k6.io/docs/getting-started/installation/)

2. Ejecuta el script principal:

```bash
k6 run k6pruebadecarga.js
