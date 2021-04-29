#!bin/bash

# Creacion del contenedor
sudo docker build -t my_sky:1.0 .

# Lanzamiento del servidor
sudo docker run -it -p 80:80 -p 443:443 my_sky:1.0
# sudo docker run -it my_sky:1.0
