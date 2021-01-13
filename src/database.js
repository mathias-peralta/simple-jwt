const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/simple-jwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log('Conectado a la base de datos');})
  .catch((err) => {console.log(err);})