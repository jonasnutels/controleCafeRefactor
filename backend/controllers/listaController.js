const db = require('../db');

const getLista = (req, res) => {
  db.query('SELECT * FROM crud.controle_cafe', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar Lista de Compras' });
    } else {
      res.json(result.rows);
    }
  });
};

module.exports = {
  getLista,
};
