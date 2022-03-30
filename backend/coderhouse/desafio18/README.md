# DIVIDIR EN CAPAS NUESTRO PROYECTO #

>> Consigna

Dividir en capas el proyecto entregable con el que venimos trabajando (entregable clase 16: loggers y profilers), agrupando apropiadamente las capas de ruteo, controlador, lógica de negocio y persistencia.

Considerar agrupar las rutas por funcionalidad, con sus controladores, lógica de negocio con los casos de uso, y capa de persistencia.

La capa de persistencia contendrá los métodos necesarios para atender la interacción de la lógica de negocio con los propios datos.

# CONCLUSIONES #

1. Anteriormente, durante la implementación de éstas tareas, ya venía preparando este tipo de arquitectura de capas.

2. Lo que veo un poco difícil de separar es el archivo que contiene el server (app.js), que contiene todo lo necesario para que la aplicación funcione.

3. Estructura de carpetas

    - /contenedor contiene txt's utilizados como bases de datos para los productos, mensajes y mensajes normalizados.

    - /controller contiene los métodos y renderizaciones necesarias para iniciar y mantener la app.

    - /middlewares contiene funciones auxiliares que en éste caso sólo verifican si el usuario está autenticado.

    - /models contiene los Schemas de MongoDb, que en éste caso sólo utilizamos para guardar información del usuario.

    - /public aquí se encuentran las diferentes páginas de nuestra app.

    - /router las rutas del proyecto junto con la separación de la ruta que se ejecuta mediante cluster.

    - /utils contiene funciones específicas del modelo de negocio, requeridas para el correcto funcionamiento de la app.

    - src/app.js server y configuración de todo el proyecto. 