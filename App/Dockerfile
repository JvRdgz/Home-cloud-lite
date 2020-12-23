# Instalacion de la imagen seleccionada de Docker Hub: alpine
FROM alpine

LABEL maintainer="github.com/JvRdgz"

# Directorio de trabajo
WORKDIR /tmp

##################################################################
################ INSTALACION DE JAVA (jdk + jre) #################
##################################################################

RUN	apt-get update
RUN	apt-get upgrade -y
RUN	apt-get install -y default-jdk default-jre
