/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna todos os usuários.
 *     description: Retorna todos os usuários cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de usuários.
 *       500:
 *         description: Erro ao buscar usuários.
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário.
 *     description: Cria um novo usuário com as informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário.
 *               email:
 *                 type: string
 *                 description: Email do usuário.
 *               usuario:
 *                 type: string
 *                 description: Nome de usuário (login).
 *               senha:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       200:
 *         description: Sucesso. Usuário criado com sucesso.
 *       400:
 *         description: Usuário ou email já existe.
 *       500:
 *         description: Erro ao criar usuário.
 */

/**
 * @swagger
 * /usuarios:
 *   put:
 *     summary: Edita um usuário existente.
 *     description: Edita as informações de um usuário existente com base no ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do usuário a ser editado.
 *               nome:
 *                 type: string
 *                 description: Novo nome do usuário.
 *               email:
 *                 type: string
 *                 description: Novo email do usuário.
 *               usuario:
 *                 type: string
 *                 description: Novo nome de usuário (login).
 *               senha:
 *                 type: string
 *                 description: Nova senha do usuário (opcional).
 *     responses:
 *       200:
 *         description: Sucesso. Usuário editado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao editar usuário.
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuário.
 *     description: Exclui um usuário com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso. Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao excluir usuário.
 */

/**
 * @swagger
 * /autenticar:
 *   post:
 *     summary: Autentica um usuário.
 *     description: Autentica um usuário com as credenciais fornecidas e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Nome de usuário (login).
 *               senha:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna o token JWT e as informações do usuário.
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Erro ao buscar usuário ou inserir sessão.
 */

/**
 * @swagger
 * /validartoken:
 *   post:
 *     summary: Valida um token JWT.
 *     description: Valida um token JWT fornecido e retorna as informações do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT a ser validado.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna as informações do usuário contidas no token.
 *       400:
 *         description: Token não fornecido.
 *       401:
 *         description: Token inválido.
 */
const db = require('../db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const getUsuarios = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, result) => {
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
    'SELECT * FROM usuarios WHERE usuario = $1 OR email = $2',
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
        'INSERT INTO usuarios (nome, email, usuario, senha_hash) VALUES ($1, $2, $3, $4)';

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
    'SELECT * FROM usuarios WHERE id_serial = $1',
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
        'UPDATE usuarios SET nome = $1, email = $2, usuario = $3, senha_hash = $4 WHERE id_serial = $5';

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
    'SELECT * FROM usuarios WHERE id_serial = $1',
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
      const deleteQuery = 'DELETE FROM usuarios WHERE id_serial = $1';

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
    'SELECT * FROM usuarios WHERE usuario = $1',
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
            {
              id_serial: usuarioEncontrado.id_serial,
              nome: usuarioEncontrado.nome,
              usuario: usuarioEncontrado.usuario,
              email: usuarioEncontrado.email,
            },
            'secreto',
            { expiresIn: '30m' },
          );

          // Inserir registro na tabela sessoes
          db.query(
            "INSERT INTO sessoes (token, usuario, data_expiracao, data_login) VALUES ($1, $2, NOW() + INTERVAL '30 minutes', NOW())",
            [token, usuario],
            (insertErr) => {
              if (insertErr) {
                console.error(insertErr);
                res.status(500).json({ error: 'Erro ao inserir sessão' });
              } else {
                res.json({ token, usuarioEncontrado });
              }
            },
          );
        } else {
          res.status(401).json({ error: 'Credenciais inválidas' });
        }
      }
    },
  );
};
const validarToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  try {
    // Verificar se o token é válido
    const decoded = jwt.verify(token, 'secreto');
    return res.json({
      id_serial: decoded.id_serial,
      nome: decoded.nome,
      usuario: decoded.usuario,
      email: decoded.email,
    }); // Retorna o usuário contido no token se for válido
  } catch (error) {
    // Se houver algum erro na validação do token
    console.error(error);
    return res.status(401).json({ error: error });
  }
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
  validarToken,
};
