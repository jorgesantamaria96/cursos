# Servidor con Balance de Carga

> > Consigna 1

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

> > Consigna 2

- Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
- Verificar que todo funcione correctamente.
- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

> > Aspectos a incluir en el entregable

Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.
Ejemplo:
- pm2 start ./miservidor.js -- --port=8080 --modo=fork
- pm2 start ./miservidor.js -- --port=8081 --modo=cluster
- pm2 start ./miservidor.js -- --port=8082 --modo=fork
- ...

# Conclusiones

1. Comandos necesarios para levantar el servidor en los diferentes modos:
    - Start server: npm run dev
    - Start server with port (default process.env.PORT or 8080): npm run dev -- --port 8081
    - Start server with port and CLUSTER: npm run dev -- --port 8081 --mode CLUSTER
    - Start server with port and FORK: npm run dev -- --port 8081 --mode FORK

2. Comandos de forever probados:

    - jorge@jorge:~/Documents/CoderHouse/desafio15$ forever list
    info:    No forever processes running
    (node:45868) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
    (Use `node --trace-warnings ...` to show where the warning was created)
    (node:45868) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency

    - jorge@jorge:~/Documents/CoderHouse/desafio15$ forever start src/app.js 
    warn:    --minUptime not set. Defaulting to: 1000ms
    warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
    info:    Forever processing file: src/app.js
    (node:45880) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
    (Use `node --trace-warnings ...` to show where the warning was created)
    (node:45880) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency

    - jorge@jorge:~/Documents/CoderHouse/desafio15$ forever list
    (node:45910) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
    (Use `node --trace-warnings ...` to show where the warning was created)
    (node:45910) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
    info:    Forever processes running
    data:        uid  command             script     forever pid   id logfile                       uptime      
    data:    [0] vygK /usr/local/bin/node src/app.js 45891   45898    /home/jorge/.forever/vygK.log 0:0:0:5.241 

    - jorge@jorge:~/Documents/CoderHouse/desafio15$ kill 45898

    - jorge@jorge:~/Documents/CoderHouse/desafio15$ forever list
    (node:45941) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
    (Use `node --trace-warnings ...` to show where the warning was created)
    (node:45941) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
    info:    Forever processes running
    data:        uid  command             script     forever pid   id logfile                       uptime      
    data:    [0] vygK /usr/local/bin/node src/app.js 45891   45929    /home/jorge/.forever/vygK.log 0:0:0:1.997

    - jorge@jorge:~/Documents/CoderHouse/desafio15$ ps aux | grep src/app.js
    jorge      45891  0.2  0.3 604044 49516 ?        Ssl  20:16   0:00 /usr/local/bin/node /usr/local/lib/node_modules/forever/bin/monitor src/app.js
    jorge      45929  1.0  0.5 964520 86280 ?        Sl   20:17   0:01 /usr/local/bin/node /home/jorge/Documents/CoderHouse/desafio15/src/app.js
    jorge      46130  0.0  0.0  17676  2768 pts/2    S+   20:19   0:00 grep --color=auto src/app.js

    - jorge@jorge:~/Documents/CoderHouse/desafio15$ forever stop src/app.js
    (node:46649) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
    (Use `node --trace-warnings ...` to show where the warning was created)
    (node:46649) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
    info:    Forever stopped process:
        uid  command             script     forever pid   id logfile                       uptime                   
    [0] vygK /usr/local/bin/node src/app.js 45891   45929    /home/jorge/.forever/vygK.log 0:0:18:37.39599999999996


3. PM2:
    En la carpeta public/images dejé una captura de pantalla de la ejecución de los últimos procersos

    Comandos:
    - pm2 start src/app.js --name="s_8081_cluster" --watch -i max -- 8081
    - pm2 start src/app.js --name="s_8080_fork" --watch -- 8080
    - pm2 start src/app.js --name="s_8082_fork" --watch -- 8082
    - pm2 start src/app.js --name="s_8083_fork" --watch -- 8083
    - pm2 start src/app.js --name="s_8084_fork" --watch -- 8084
    - pm2 start src/app.js --name="s_8085_fork" --watch -- 8085