<?php
$directorio = "C:\Users\pc1\Desktop\Codes\Ozone\prueba1\converted_files";        #carpeta con archivos
$contador = 0;
$dir = opendir($directorio);
while ($archivo = readdir($dir)){
    if ($archivo != "." && $archivo != ".."){           #muestro los archivos mas el contador
        $contador++;
        echo  "nombre: <strong> $archivo </strong></br>" ;
    }
}
echo "total de archivos: <strong> $contador </strong></br>" ;

closedir($dir);
?>