import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import axios from 'axios';



export const predict = async (req: Request, res: Response) => {
    const {session} =req.body;
    let identificador='';
    let lat=0;
    let long=0;
    const regex = /q=([\d.-]+),([\d.-]+)/;
const match = session[0].ubicacion.match(regex);

if (match) {
   lat = parseFloat(match[1]);
   long = parseFloat(match[2]);
} 
    const url = 'http://ramon-ai-api-env.eba-vzftt7ap.us-east-1.elasticbeanstalk.com/api/locate/'+lat+'/'+long;

axios.get(url)
  .then(response => {
    // La respuesta exitosa del servicio estará disponible en response.data
    identificador=response.data.id;
  })
  .catch(error => {
    // Manejo de errores en caso de que la solicitud falle
    console.error(error);
  });
    const file_path = path.join(__dirname,"../dataset/mexico.dat");
    
  
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    
    const temperatureData = [];
    
    fs.readFile(file_path, 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        return;
      }
    
      const lines = data.split('\n');
    
      lines.forEach((line) => {
        const identifier = line.slice(0, 11).trim(); // Identificador (primeros 11 caracteres)
        const year = parseInt(line.slice(11, 15), 10); // Año (4 dígitos después del identificador)
        const temperatures = line.slice(15).split(/\s+/).map(Number); // Temperaturas mensuales
    
        temperatures.forEach((temperature, index) => {
          const month = monthNames[index]; // Nombre del mes
    
          const temperatureEntry = {
            identificador: identifier,
            temperatura: temperature / 10, // Temperatura (convertida a unidades adecuadas)
            mes: month,
            año: year,
          };
    
          temperatureData.push(temperatureEntry);
        });
      });
    
      const jsonData = JSON.stringify(temperatureData, null, 2);
      console.log(jsonData);
    });
   
}


