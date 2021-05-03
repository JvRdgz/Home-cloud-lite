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
################ INSTALACION DE JAVA (jdk + jre) #################
##################################################################

# RUN	apk-get update
# RUN	apk-get upgrade -y
# RUN	apk-get install -y default-jdk default-jre

##################################################################
######### INSTALACION Y CONFIGURACION DEL PROTOCOLO SSL ##########
##################################################################

# Instalacion del protocolo. SOLO SI UTILIZO EL SERVIDOR NGINX
# RUN apk-get install -y openssl

##################################################################
########### INSTALACION DE HERRAMIENTAS DE DESARROLLO ############
##################################################################

# Instalacion del editor de texto vim y de instalador de ficheros wget.
RUN		apt install -y vim wget systemd

# Script para listar versiones de Nodejs
# RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# Utilizar nvm desde el perfil bash de mi usuario.
# RUN source ~/.profile

RUN 	apt install -y nodejs npm


##################################################################
############### INSTALACION DE NODE Y DEPENDENCIAS ###############
##################################################################

# En caso de que npm no se instale: sudo apk install npm build-essential

# Instalacion de la version 14.15.1 de Node.
# RUN nvm install 14.15.1

# Instalacion de dependencias necesarias para la aplicacion.
RUN		npm i -S express express-fileupload express-session cookie-parser connect-flash bcrypt-nodejs multer path morgan fs react react-dom mime-types mongoose passport body-parser passport-local ejs require-optional

# Instalacion de P2M para ejecutar demonios dentro de la app
RUN		npm install pm2@latest -g

# Instalacion de MongoDB
# RUN		wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
RUN		wget https://www.mongodb.org/static/pgp/server-4.4.asc -qO- | apt-key add -
RUN		echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" >> /etc/apt/sources.list.d/mongodb-org.list
RUN		apt update
# RUN		apt --update add mongodb mongodb-tools
# RUN		mkdir -p /data/db
# RUN		ps --no-headers -o comm 1
RUN		apt-get install -y mongodb-org

# RUN		/etc/init.d/mongod start
# RUN		systemctl enable --now mongod
# RUN		systemctl start mongod
# RUN		service mongodb start
# RUN		systemctl enable mongod
# RUN		service mongodb status
# RUN		systemctl start mongod.service
# RUN		systemctl enable --now mongod

##################################################################
################ INSTALACION DE JAVA (jdk + jre) #################
##################################################################

# Mover mi aplicacion dentro del contenedor.
COPY	./app ./



###################################################################
#############  PUERTOS DE ESCUCHA DE LOS SERVIDORES  ##############
###################################################################

# En el server.js esta definido que si no encuentra uno de los puertos del
# sistema operativo, coja por defecto el puerto 3000. En este caso deberia
# coger el puerto definido en el Dockerfile.
# EXPOSE 80 443
EXPOSE 3000

# Ejecutar el comando para levantarla en local.
CMD bash init_services.sh

# Comando para levantar contenedor
# docker build -t MySky:1.0 .
# docker run -it -p 80:80 -p 443:443 MySky:1.0
