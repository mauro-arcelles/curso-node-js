require('dotenv').config();

const Server = require('./models/server')

const server = new Server();

server.listen();

// Librerias utilizadas:
// express
// express-validator
// dotenv
// mongoose
// nodemon (ya está instalado de forma global)
// cors
// jsonwebtoken
// bcryptjs
// uuid
// express-fileupload
// cloudinary