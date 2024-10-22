const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(auth);
// Habilitar CORS
//server.use((req, res, next) => {
//  res.header('Access-Control-Allow-Origin', '*');
//  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//  next();
//});
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});