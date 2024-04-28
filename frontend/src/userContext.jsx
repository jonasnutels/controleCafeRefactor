import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  AUTENTICAR_POST,
  LISTA_COMPRAS_GET,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
