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
// google-auth-library
// uuid
// express-fileupload
// cloudinary