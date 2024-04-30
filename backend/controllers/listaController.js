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

const getFilaCafe = (req, res) => {
  db.query(
    'SELECT * FROM fila_cafe ORDER BY data_compra ASC',
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar Lista de Compras' });
      } else {
        res.json(result.rows);
      }
    },
  );
};

const updateDataCompraFila = (req, res) => {
  const { id, novaDataCompra } = req.body;

  db.query(
    'UPDATE fila_cafe SET data_compra = $1 WHERE id = $2',
    [novaDataCompra, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar a data de compra' });
      } else {
        res
          .status(200)
          .json({ message: 'Data de compra atualizada com sucesso' });
      }
    },
  );
};
const inserirCompra = (req, res) => {
  const {
    nomeComprador,
    dataDaCompra,
    tipoCafe,
    quantidadeKg,
    fornecedor,
    valorTotal,
    metodoPagamento,
    observacoes,
    email_registros,
  } = req.body;

  db.query(
    'INSERT INTO controle_cafe (nome_comprador, data_compra, tipo_cafe, quantidade_kg, fornecedor, valor_total, metodo_pagamento, observacoes, registrado_em, email_registros) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now(), $9)',
    [
      nomeComprador,
      dataDaCompra,
      tipoCafe,
      quantidadeKg,
      fornecedor,
      valorTotal,
      metodoPagamento,
      observacoes,
      email_registros,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao inserir a compra' });
      } else {
        res.status(200).json({ message: 'Compra inserida com sucesso' });
      }
    },
  );
};
module.exports = {
  getLista,
  getFilaCafe,
  updateDataCompraFila,
  inserirCompra,
};
