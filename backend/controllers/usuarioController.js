const db = require('../db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const getUsuarios = (req, res) => {
  db.query('SELECT * FROM crud.usuarios', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    } else {
      res.json(result.rows);
    }
  });
};

const criarUsuario = (req, res) => {
  const { nome, email, usuario, senha } = req.body;

  // Hash SHA-256 da senha
  const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

  // Verificar se o usuário ou o email já existem na tabela
  db.query(
    'SELECT * FROM crud.usuarios WHERE usuario = $1 OR email = $2',
    [usuario, email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: 'Erro ao verificar usuário existente' });
      }

      if (result.rows.length > 0) {
        // Usuário ou email já existem, informar ao cliente
        return res.status(400).json({ error: 'Usuário ou email já existe' });
      }

      // Usuário e email não existem, criar novo cadastro
      const insertQuery =
        'INSERT INTO crud.usuarios (nome, email, usuario, senha_hash) VALUES ($1, $2, $3, $4)';

      db.query(insertQuery, [nome, email, usuario, senhaHash], (insertErr) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ error: 'Erro ao criar usuário' });
        } else {
          res.json({ message: 'Usuário criado com sucesso' });
        }
      });
    },
  );
};
const editarUsuario = (req, res) => {
  const { id, nome, email, usuario, senha } = req.body;

  // Verificar se o usuário existe na tabela
  db.query(
    'SELECT * FROM crud.usuarios WHERE id_serial = $1',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: 'Erro ao verificar usuário existente' });
      }

      if (result.rows.length === 0) {
        // Usuário não encontrado, informar ao cliente
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Usuário encontrado, realizar a edição
      const updateQuery =
        'UPDATE crud.usuarios SET nome = $1, email = $2, usuario = $3, senha_hash = $4 WHERE id_serial = $5';

      // Se uma nova senha foi fornecida, hash a nova senha
      const senhaHash = senha
        ? crypto.createHash('sha256').update(senha).digest('hex')
        : result.rows[0].senha_hash;

      db.query(
        updateQuery,
        [nome, email, usuario, senhaHash, id],
        (updateErr) => {
          if (updateErr) {
            console.error(updateErr);
            return res.status(500).json({ error: 'Erro ao editar usuário' });
          } else {
            res.json({ message: 'Usuário editado com sucesso' });
          }
        },
      );
    },
  );
};

const excluirUsuario = (req, res) => {
  const id = req.params.id;

  // Verificar se o usuário existe na tabela
  db.query(
    'SELECT * FROM crud.usuarios WHERE id_serial = $1',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: 'Erro ao verificar usuário existente' });
      }

      if (result.rows.length === 0) {
        // Usuário não encontrado, informar ao cliente
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Usuário encontrado, realizar a exclusão
      const deleteQuery = 'DELETE FROM crud.usuarios WHERE id_serial = $1';

      db.query(deleteQuery, [id], (deleteErr) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res.status(500).json({ error: 'Erro ao excluir usuário' });
        } else {
          res.json({ message: 'Usuário excluído com sucesso' });
        }
      });
    },
  );
};
const autenticar = (req, res) => {
  const { usuario, senha } = req.body;

  // Buscar usuário no banco de dados
  db.query(
    'SELECT * FROM crud.usuarios WHERE usuario = $1',
    [usuario],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
      } else {
        const usuarioEncontrado = result.rows[0];

        // Verificar se o usuário existe e a senha está correta
        if (
          usuarioEncontrado &&
          verificaSenha(senha, usuarioEncontrado.senha_hash)
        ) {
          // Gerar token JWT
          const token = jwt.sign(
            { usuario: usuarioEncontrado.usuario },
            'secreto',
            { expiresIn: '30m' },
          );
          res.json({ token, usuarioEncontrado });
        } else {
          res.status(401).json({ error: 'Credenciais inválidas' });
        }
      }
    },
  );
};

// Função para verificar a senha
const verificaSenha = (senha, senhaHash) => {
  const hashInput = crypto.createHash('sha256').update(senha).digest('hex');
  return hashInput === senhaHash;
};

module.exports = {
  getUsuarios,
  criarUsuario,
  autenticar,
  editarUsuario,
  excluirUsuario,
};
