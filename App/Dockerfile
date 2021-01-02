# *********************************************************************************************************** #
#       ##       ##											      #
#      ##       ##											      #
#     ##       ##											      #
#    ###########											      #
#   ##       ##  ####  #####  ####      ####  #     ####  #  #  ####               #     #  ####  ####	      #
#  ##       ##  #  #  # # #  ##        #     #     #  #  #  #  #   #     ####     #     #    #   ##	      #
# ##       ##  ####  # # #  ####      ####  ####  ####  ####  ####               ####  #    #   ####	      #
# *********************************************************************************************************** #


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

# Instalacion de la version 14.15.1 de Node.
RUN nvm install 14.15.1

# Mover mi aplicacion dentro del contenedor.

# Ejecutar el comando para levantarla en local.
