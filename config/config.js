process.env.jwtKey = 'key123'


//Alt + shift + a para descomentar.
/* //Puerto
//============
process.env.PORT = process.env.PORT || 3000;



//===========
//Entorno
//===========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
    //si estamos en heroku, process.env.NODE_ENV existe
    //si estamos local es undefined, entonces lo seteamos a dev.


//===========
//Base de datos
//===========

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/pruebasFront'
} else {
    urlDB = 'mongodb+srv://jfqdev:joaco1234@cluster0.8hxqf.mongodb.net/pruebasFront?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB; // estamos agregando esa propiedad a una variable global!, no hace falta require.


//===========
//Vencimiento del token
//===========

process.env.CADUCIDAD_TOKEN = 3600;

//===========
//Token Key ( o seed)
//===========

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo'
    //en heroku process.env.SEED = 'keyproduccion' */