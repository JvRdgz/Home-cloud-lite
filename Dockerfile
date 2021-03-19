# Instalacion de la imagen seleccionada de Docker Hub: alpine
FROM alpine

LABEL maintainer="github.com/JvRdgz"

# Directorio de trabajo
WORKDIR /tmp

##################################################################
######## ACTUALIZACION DE REPOSITORIOS Y CABECERAS LINUX #########
##################################################################

RUN apt-get update
RUN apt-get upgrade -y

##################################################################
################ INSTALACION DE JAVA (jdk + jre) #################
##################################################################

# RUN	apt-get update
# RUN	apt-get upgrade -y
# RUN	apt-get install -y default-jdk default-jre

##################################################################
######### INSTALACION Y CONFIGURACION DEL PROTOCOLO SSL ##########
##################################################################

# Instalacion del protocolo. SOLO SI UTILIZO EL SERVIDOR NGINX
# RUN apt-get install -y openssl

##################################################################
########### INSTALACION DE HERRAMIENTAS DE DESARROLLO ############
##################################################################

# Instalacion del editor de texto vim y de instalador de ficheros wget.
RUN apt-get install -y vim wget

# Script para listar versiones de Nodejs
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# Utilizar nvm desde el perfil bash de mi usuario.
RUN source ~/.profile




##################################################################
############### INSTALACION DE NODE Y DEPENDENCIAS ###############
##################################################################

# Instalacion de la version 14.15.1 de Node.
RUN nvm install 14.15.1

# Instalacion de dependencias necesarias para la aplicacion.
RUN npm i -S express multer path morgan fs react react-dom

# Instalacion de dependencias de desarrollo
RUN npm i babel-core babel-preset-react babel-preset-es2015 babel-loader webpack webpack-cli -D




##################################################################
################ INSTALACION DE JAVA (jdk + jre) #################
##################################################################

# Mover mi aplicacion dentro del contenedor.
COPY app ./



###################################################################
#############  PUERTOS DE ESCUCHA DE LOS SERVIDORES  ##############
###################################################################

EXPOSE 80 443

# Ejecutar el comando para levantarla en local.
CMD [ "bash ./tmp/app/init_services.sh" ]

# Comando para levantar contenedor
# docker build -t MySky:1.0 .
# docker run -it -p 80:80 -p 443:443 MySky:1.0