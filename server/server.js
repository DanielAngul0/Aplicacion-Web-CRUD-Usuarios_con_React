// ----- 'server.js' es el archivo principal en el cual se configura todo el servidor, por lo cual todos los middleware que se usen y las configuraciones que tenga este archivo afectaran a todos los demas archivos a los que 'server.js' les tenga configuracion o se vinculen a el -----


// importando el framework 'express'
import express from 'express'
// importa todas las rutas del CRUD de la carpeta '../rutas/usuarios.js' para que sea accesibles bajo la direccion '/usuarios'
import usuariosRouter from '../rutas/usuarios.js'
// permite que el servidor reciba solicitudes de otros puertos distintos al 3000
import cors from 'cors'
// proporciona utilidades para trabajar con rutas de archivos y directorios
import path from 'path';

// creando instancia de la aplicacion 'express'
const app = express();
// Creando vinculo del puerto 3000 al puerto 3001(Puerto de React)
const port = 3000;


// Solo permite solicitudes desde React (puerto 3001)
app.use(cors({
    origin: 'http://localhost:3001'  
}));
// Este middleware ayuda a express a interpretar codigo en formato JSON, util para los metodos HTTP que seran comprendidos a traves de req.body manejando los datos del cliente
app.use(express.json());
// Este middleware es esencial para que cualquier archivo estatico(HTML, CSS, Imagenes, etc.) de la carpeta 'public' sea accesible
// 'path.resolve' busca la ubicación de esa carpeta a partir del directorio actual de trabajo y la convierte en una ruta absoluta. Asegurando que el servidor pueda encontrar la carpeta 'public', independientemente de desde dónde se ejecute la aplicación
app.use(express.static(path.resolve('public')));
// Todas las rutas definidas en 'usuariosRouter' estarán bajo el prefijo '/usuarios'. Esto significa que, al hacer una solicitud a '/usuarios', esa solicitud será gestionada por 'usuariosRouter', que se encargará de manejar las operaciones del CRUD y las rutas relacionadas con los usuarios.
app.use('/usuarios', usuariosRouter);


// Servidor a la escucha en el puerto 3000
app.listen(port , () =>{
    console.log(`Servidor a la escucha en el puerto: ${port}`);
})