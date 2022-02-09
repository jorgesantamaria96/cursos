## DESAFÍO 13: LOGIN Y REGISTRO | JWT ##

> > Consigna:

- Implementar sobre el entregable que venimos realizando un mecanismo de autenticación. Para ello:

1. Se incluirá una vista de registro, en donde se pidan email y contraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada (sugerencia: usar la librería bcrypt).

2. Una vista de login, donde se pida email y contraseña, y que realice la autenticación del lado del servidor a través de una estrategia de passport local.

3. Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a la otra.

4. Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email, y un botón para desolguearse.

5. Además, se activará un espacio de sesión controlado por la sesión de passport. Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.

6. Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado).

7. El resto de la funciones, deben quedar tal cual estaban el proyecto original.

## Conclusión del desafío ##

1. Se invita a realizar un registro de usuario para verificar la funcionalidad del mismo.

2. Se usa bcrypt para encriptar la contraseña.

3. Se mantiene la sesión del usuario mediante el middleware auth, que verifica que el string email esté en el req.session.