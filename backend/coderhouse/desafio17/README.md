# IMPLEMENTAR NUESTRO PROYECTO EN HEROKU

> Consigna

Crear un proyecto en Heroku.com para subir el servidor que venimos realizando, reformando todo lo necesario para su correcto funcionamiento en la nube.

Subir el código a Heroku.com, sin olvidar incluir el archivo .gitignore para evitar subir los node_modules. Comprobar que el proyecto inicie de manera correcta en la nube. Verificar que en su ruta raíz se encuentre la página pública del servidor.

El servidor debe seguir funcionando en forma local.

Realizar un cambio a elección en alguna vista, probar en forma local y subir nuevamente el proyecto a Heroku, verificando que la nueva reforma esté disponible online.

Revisar a través de una consola local, los mensajes enviados por nuestro servidor en Heroku a su propia consola.

# Conclusiones #

> Comandos utilizados a la hora de subir el proyecto a heroku.com

$ heroku login
Logging in... done
Logged in as jorge.santamaria966@gmail.com

$ heroku create desafio17-coderhouse
Creating ⬢ desafio17-coderhouse... done
https://desafio17-coderhouse.herokuapp.com/ | https://git.heroku.com/desafio17-coderhouse.git

$ git push heroku master
Enumerating objects: 43, done.
Counting objects: 100% (43/43), done.
Delta compression using up to 8 threads
Compressing objects: 100% (39/39), done.
Writing objects: 100% (43/43), 67.03 KiB | 2.68 MiB/s, done.
Total 43 (delta 3), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote: 
remote: -----> Building on the Heroku-20 stack
remote: -----> Determining which buildpack to use for this app
remote: -----> Node.js app detected
remote:        
remote: -----> Creating runtime environment
remote:        
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NODE_VERBOSE=false
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:        
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:        
remote:        Resolving node version 16.x...
remote:        Downloading and installing node 16.14.0...
remote:        Using default npm version: 8.3.1
remote:        
remote: -----> Installing dependencies
remote:        Installing node modules
remote:        
remote:        added 282 packages, and audited 283 packages in 6s
remote:        
remote:        24 packages are looking for funding
remote:          run `npm fund` for details
remote:        
remote:        found 0 vulnerabilities
remote:        
remote: -----> Build
remote:        
remote: -----> Caching build
remote:        - node_modules
remote:        
remote: -----> Pruning devDependencies
remote:        
remote:        up to date, audited 186 packages in 645ms
remote:        
remote:        9 packages are looking for funding
remote:          run `npm fund` for details
remote:        
remote:        found 0 vulnerabilities
remote:        
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote: 
remote: -----> Compressing...
remote:        Done: 38.3M
remote: -----> Launching...
remote:        Released v3
remote:        https://desafio17-coderhouse.herokuapp.com/ deployed to Heroku
remote: 
remote: Verifying deploy... done.
To https://git.heroku.com/desafio17-coderhouse.git
 * [new branch]      master -> master


Aquí, se setean las variables desde la web de heroku segun lo establecido en el .env


$ heroku logs --tail

2022-03-12T22:17:28.000000+00:00 app[api]: Build started by user jorge.santamaria966@gmail.com
2022-03-12T22:17:48.685184+00:00 app[api]: Release v6 created by user jorge.santamaria966@gmail.com
2022-03-12T22:17:48.685184+00:00 app[api]: Deploy 4c3bb32c by user jorge.santamaria966@gmail.com
2022-03-12T22:17:50.000000+00:00 app[api]: Build succeeded
2022-03-12T22:17:50.145329+00:00 heroku[web.1]: Restarting
2022-03-12T22:17:50.159802+00:00 heroku[web.1]: State changed from up to starting
2022-03-12T22:17:50.956471+00:00 heroku[web.1]: Stopping all processes with SIGTERM
2022-03-12T22:17:51.246435+00:00 heroku[web.1]: Process exited with status 143
2022-03-12T22:17:52.288790+00:00 heroku[web.1]: Starting process with command `npm start`
2022-03-12T22:17:53.673519+00:00 app[web.1]: 
2022-03-12T22:17:53.673535+00:00 app[web.1]: > desafio17coderhouse@1.0.0 start
2022-03-12T22:17:53.673536+00:00 app[web.1]: > node src/app.js
2022-03-12T22:17:53.673536+00:00 app[web.1]: 
2022-03-12T22:17:54.453186+00:00 app[web.1]: [FORK]: Worker 22 started...
2022-03-12T22:17:54.454721+00:00 app[web.1]: Server 22 on http://localhost:17874
2022-03-12T22:17:54.696570+00:00 heroku[web.1]: State changed from starting to up