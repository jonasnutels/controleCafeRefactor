const express = require('express');
require('dotenv/config');
const bodyParser = require('body-parser');
const usuarioController = require('./controllers/usuarioController');
const listaController = require('./controllers/listaController');
const basicAuth = require('basic-auth');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
const basicAuthMiddleware = (req, res, next) => {
  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send('Não autorizado ');
  }

  if (
    user.name === process.env.BASIC_AUTH_USER &&
    user.pass === process.env.BASIC_AUTH_PASSWORD
  ) {
    return next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send('Não autorizado');
  }
};

app.use(basicAuthMiddleware);
app.use(bodyParser.json());

// Rotas Usuários
app.get('/usuarios', usuarioController.getUsuarios);
app.post('/usuarios', usuarioController.criarUsuario);
app.put('/usuarios', usuarioController.editarUsuario);
app.delete('/usuarios/:id', usuarioController.excluirUsuario);
app.post('/autenticar', usuarioController.autenticar);
app.post('/validartoken', usuarioController.validarToken);

//Rotas Lista de Compras
app.get('/lista', listaController.getLista);
app.get('/filacafe', listaController.getFilaCafe);
app.put('/atualizarfila', listaController.updateDataCompraFila);
app.post('/registrarcompra', listaController.inserirCompra);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
