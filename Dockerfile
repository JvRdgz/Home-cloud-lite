# Instalacion de la imagen seleccionada de Docker Hub: debian buster
FROM debian:buster

LABEL maintainer="github.com/JvRdgz"

# Directorio de trabajo
WORKDIR	/tmp

##################################################################
######## ACTUALIZACION DE REPOSITORIOS Y CABECERAS LINUX #########
##################################################################

RUN		apt update
RUN		apt upgrade --yes
RUN		apt install -y gnupg

##################################################################
######### INSTALACION Y CONFIGURACION DEL PROTOCOLO SSL ##########
##################################################################

# Instalacion del protocolo. SOLO SI UTILIZO EL SERVIDOR NGINX
# RUN apk-get install -y openssl

##################################################################
########### INSTALACION DE HERRAMIENTAS DE DESARROLLO ############
##################################################################

# Instalacion del editor de texto vim y de instalador de ficheros wget.
RUN		apt install -y vim wget systemd nodejs npm

##################################################################
############### INSTALACION DE NODE Y DEPENDENCIAS ###############
##################################################################

# Instalacion de dependencias necesarias para la aplicacion.
RUN		npm i -S express express-fileupload express-session cookie-parser connect-flash bcrypt-nodejs multer path morgan fs mime-types mongoose passport body-parser passport-local ejs require-optional method-override dotenv mkdirp pm2@latest
##################################################################
########################### MONGODB ##############################
##################################################################

# Instalacion de MongoDB
RUN		wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
# RUN		wget https://www.mongodb.org/static/pgp/server-4.4.asc -qO- | apt-key add -
RUN		echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" >> /etc/apt/sources.list.d/mongodb-org-4.4.list

RUN		apt update

RUN		apt-get install -y mongodb-org

# Mover mi aplicacion dentro del contenedor.
COPY	./app ./



###################################################################
#############  PUERTOS DE ESCUCHA DE LOS SERVIDORES  ##############
###################################################################

# En el server.js esta definido que si no encuentra uno de los puertos del
# sistema operativo, coja por defecto el puerto 3000, pero en este caso el
# contenedor escucha por el puerto 8080, por lo tanto para probar el servidor
# en local, se debera de ingresar a localhost:8080
EXPOSE 3000

# Ejecutar el comando para levantarla en local.
# CMD bash init_services.sh
CMD [ "bash" ]
