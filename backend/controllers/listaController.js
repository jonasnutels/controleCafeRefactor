/**
 * @swagger
 * /lista:
 *   get:
 *     summary: Retorna a lista de compras.
 *     description: Retorna todos os itens da lista de compras.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de compras.
 *       500:
 *         description: Erro ao buscar a lista de compras.
 */

const db = require('../db');

const getLista = (req, res) => {
  db.query('SELECT * FROM controle_cafe', (err, result) => {
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
