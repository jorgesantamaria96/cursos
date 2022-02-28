# Usando el objeto process

> > Consigna 1

Sobre el proyecto del último desafío entregable, mover todas las claves y credenciales utilizadas a un archivo .env, y cargarlo mediante la librería dotenv.

La única configuración que no va a ser manejada con esta librería va a ser el puerto de escucha del servidor. Éste deberá ser leído de los argumento pasados por línea de comando, usando alguna librería (minimist o yargs). En el caso de no pasar este parámetro por línea de comandos, conectar por defecto al puerto 8080.

Observación: por el momento se puede dejar la elección de sesión y de persistencia explicitada en el código mismo. Más adelante haremos también parametrizable esta configuración.

> > Consigna 2

Agregar una ruta '/info' que presente en una vista sencilla los siguientes datos:

- Argumentos de entrada
- Path de ejecución
- Nombre de la plataforma (sistema operativo)
- Process id
- Versión de node.js
- Carpeta del proyecto
- Memoria total reservada (rss)

> > Consigna 3

Agregar otra ruta '/api/randoms' que permita calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query).
Por ej: /randoms?cant=20000.
Si dicho parámetro no se ingresa, calcular 100.000.000 números.
El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será bloqueante (utilizar el método fork de child_process). Comprobar el no bloqueo con una cantidad de 500.000.000 de randoms.

Observación: utilizar routers y apis separadas para esta funcionalidad.

# Conclusiones

1. El comando utilizado para levantar el servidor es el siguiente:

$ npm run dev -- --port PORT
(
Algunos detalles a tener en cuenta:
1- Luego del npm run dev, el -- sirve como separador del script de los argumentos de la linea de comandos.
2- (--port PORT) es el puerto específico en el que va a correr mi aplicación, y la nomenclatura utilizada es parte de minimist.
)

$ npm run dev (también se encuentra disponible, siendo opcional utilizar process.env.PORT o en su defecto, va a tomar el puerto 8080)

2. Todas las variables principales del proyecto se encuentran instanciadas en el archivo .env.exampel, para poder utilizar el proyecto, por favor, cree un nuevo archivo .env con éstas variables como contenido del archivo.

3. En la barra de navegación se colocó el acceso a la ruta /info, para ello se deberá acceder primero a la app, y luego ingresar a la ruta.

4. Encontré un problema entre child_process y babel, se ve que en producción no existía la posibilidad de usarlo, además, en la documentación de node se aclara éste problema y recomienda no usarlo con babel-node, se eliminó babel y todos sus plugins con respecto a la entrega anterior.
