## ECOMMERCE CODERHOUSE - JORGE SANTAMARIA

> > Consigna: Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

> > Aspectos a incluir en el entregable:
> > a. A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.
> > b. En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor (opcional: investigar el uso de imports dinámicos).
> > c. Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

> > Opcional:
> > Hacer lo mismo para bases de datos relacionales: MariaDB/SQLite3.

## Rutas del proyecto:
 - Github: https://github.com/jorgesantamaria96/ecommerce-backend
 - Heroku: https://ecommerce1coderhouse.herokuapp.com/

## Puntos a tener en cuenta en el proyecto:

1. contenedorArchivo.js contiene una clase asocioada a los txt generados mediante filesystem.

2. contenedorFirebase.js contiene una clase que utiliza firestore como base de datos.

3. contenedorMemoria.js contiene una clase que utiliza knex y mysql como manejador y base de datos.

4. contenedorMongoDB.js contiene una clase que utiliza mongoDB y permite realizar las operaciones básicas del CRUD.

5. El archivo config.js posee la información de las conexiones a las diferentes db's.

6. En el archivo .env podemos pasar como DB_SELECTED las opciones de mysql, firebase, mongodb, filesystem. Por defecto viene instanciada mysql.
