import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ATUALIZAR_FILA_PUT,
  AUTENTICAR_POST,
  FILA_GET,
  LISTA_COMPRAS_GET,
  REGISTRAR_COMPRA_POST,
  VALIDAR_TOKEN_POST,
} from './service/api';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [autenticado, setAutenticado] = useState(false);
  const [lista, setLista] = useState([]);
  const [fila, setFila] = useState([]);

  async function handleLogin(usuario, senha) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = AUTENTICAR_POST({ usuario, senha });

      const autenticando = await fetch(url, options);

      if (!autenticando.ok) {
        toast.error('Erro ao autenticar :(');
      } else {
        const { token, usuarioEncontrado } = await autenticando.json();
        setUsuario(usuarioEncontrado);
        toast.success('Entrando ... ');
        setTimeout(() => {
          setAutenticado(true);
          window.localStorage.setItem('token', token);
          navigate('/lista');
        }, [3000]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleValidarToken(token) {
    try {
      const { url, options } = VALIDAR_TOKEN_POST({ token });

      const autenticando = await fetch(url, options);
      const dados = await autenticando.json();
      if (!autenticando.ok) {
        toast.error('Você precisa logar novamente...');
      } else {
        setUsuario(dados);
        setAutenticado(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    toast.warning('Saindo... ');
    setTimeout(() => {
      setError(null);
      setLoading(false);
      setUsuario(null);
      setAutenticado(false);
      window.localStorage.removeItem('token');
      navigate('/');
    }, [2000]);
  }
  async function getLista() {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = LISTA_COMPRAS_GET();

      const lista = await fetch(url, options);

      if (!lista.ok) {
        toast.error('Erro ao autenticar :(');
      } else {
        const dados = await lista.json();
        setLista(dados);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function atualizarFila(id, novaDataCompra) {
    try {
      const body = { id, novaDataCompra };
      const { url, options } = ATUALIZAR_FILA_PUT(body);

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Erro ao atualizar a fila');
      } else {
        toast.success('Fila atualizada com sucesso!');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function getFila() {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = FILA_GET();

      const dados = await fetch(url, options);

      if (!dados.ok) {
        throw new Error('Erro ao buscar a fila');
      } else {
        const result = await dados.json();
        setFila(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function registrarCompra(dadosCompra) {
    console.log(dadosCompra);
    try {
      const { url, options } = REGISTRAR_COMPRA_POST(dadosCompra);

      const response = await fetch(url, options);

      if (!response.ok) {
        toast.error('Falha ao registrar.');
        throw new Error('Erro ao registrar a compra');
      } else {
        const data = await response.json();
        toast.success('Registrado com sucesso!');
        navigate('/lista');
        return data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <UserContext.Provider
      value={{
        handleLogin,
        autenticado,
        handleLogout,
        usuario,
        loading,
        error,
        getLista,
        lista,
        handleValidarToken,
        getFila,
        fila,
        atualizarFila,
        registrarCompra,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
