const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mysky', {
    // Para eliminar el mensaje de la consola
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error al conectar a la BBDD:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
    console.log('Se ha establecido conexion con la BBDD'); // si esta todo ok, imprime esto
});