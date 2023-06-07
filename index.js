//Importamos lso modulo (fs, csv-parser, http)
const fs = require('fs');
const csv = require('csv-parser');
const http = require('http');
const { log } = require('console');


//Rutas de archivos
const csvFilePath = './archivoCSV/tabla.csv';
const jsonFilePath = './archivoJSON';

//Creo el server (de previs nomas)
const server = http.createServer((req, res) => {
  // Verificar la ruta solicitada
  if (req.url === '/convert') {
    // Creas un array vacio para almacenar lso datos del array
    const jsonArray = [];
    //Lees el archivo
    fs.createReadStream(csvFilePath)
    //vemos que hay dentro del csv 
      .pipe(csv())
      .on('data', (data) => jsonArray.push(data))
      .on('end', () => {
        const jsonData = JSON.stringify(jsonArray);
        console.log(jsonArray);    
        // Guardamos el archivo JSON
        fs.writeFile(jsonFilePath, jsonData, (error) => {
          if (error) {
            console.error('Error al guardar el archivo JSON:', error);
            res.statusCode = 500;
            res.end('Error al guardar el archivo JSON');
          } else {
            console.log('Archivo JSON guardado correctamente.');
            res.statusCode = 200;
            res.end('Archivo JSON guardado correctamente');
          }
        });
      });
  } else {
    // Ruta inválida o no encontró el dichoso csv que dices que ya tienes
    res.statusCode = 404;
    res.end('Ruta no encontrada');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server correindo en el puerto: ${port}`);
});
