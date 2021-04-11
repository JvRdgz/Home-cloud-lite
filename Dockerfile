# Instalacion de la imagen seleccionada de Docker Hub: alpine
FROM alpine

LABEL maintainer="github.com/JvRdgz"

# Directorio de trabajo
WORKDIR	/tmp

##################################################################
######## ACTUALIZACION DE REPOSITORIOS Y CABECERAS LINUX #########
##################################################################

RUN		apk update
RUN		apk upgrade --yes

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
RUN		apk install -y vim wget

# Script para listar versiones de Nodejs
# RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# Utilizar nvm desde el perfil bash de mi usuario.
# RUN source ~/.profile

RUN 	apk install -y nodejs npm


##################################################################
############### INSTALACION DE NODE Y DEPENDENCIAS ###############
##################################################################

# En caso de que npm no se instale: sudo apk install npm build-essential

# Instalacion de la version 14.15.1 de Node.
# RUN nvm install 14.15.1

# Instalacion de dependencias necesarias para la aplicacion.
RUN		npm i -S express express-fileupload express-session cookie-parse connect-flash bcrypt-nodejs multer path morgan fs react react-dom mime-types mongoose passport

# Instalacion de dependencias de desarrollo
RUN		npm i -S babel-core babel-preset-react babel-preset-es2015 babel-loader webpack webpack-cli -D

# Instalacion de P2M para ejecutar demonios dentro de la app
RUN		npm install pm2@latest -g




##################################################################
################ INSTALACION DE JAVA (jdk + jre) #################
##################################################################

# Mover mi aplicacion dentro del contenedor.
COPY	app ./



###################################################################
#############  PUERTOS DE ESCUCHA DE LOS SERVIDORES  ##############
###################################################################

# En el server.js esta definido que si no encuentra uno de los puertos del
# sistema operativo, coja por defecto el puerto 3000. En este caso deberia
# coger el puerto definido en el Dockerfile.
EXPOSE 80 443

# Ejecutar el comando para levantarla en local.
CMD [ "bash ./tmp/app/init_services.sh" ]

# Comando para levantar contenedor
# docker build -t MySky:1.0 .
# docker run -it -p 80:80 -p 443:443 MySky:1.0