const fs = require('fs');
const https = require('https');
const next = require('next');

// Determina si es en entorno de desarrollo o producción
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Configuración de HTTPS
  const httpsOptions = {
    key: fs.readFileSync('./server.key'),  // Ruta a la clave privada
    cert: fs.readFileSync('./server.crt'), // Ruta al certificado
  };

  // Crea el servidor HTTPS y haz que escuche en la IP específica
  https
    .createServer(httpsOptions, (req, res) => {
      handle(req, res); // Maneja todas las peticiones con Next.js
    })
    .listen(443, '192.168.0.28', () => { // Escuchar en 192.168.0.28
      console.log('Servidor HTTPS corriendo en https://192.168.0.28:443');
    });
});
