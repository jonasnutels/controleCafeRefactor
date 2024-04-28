import React, { useState, useContext, useEffect } from 'react';
import astro from '../assets/astronauta.png';
import styles from './Home.module.css';
import { UserContext } from '../userContext';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { toast } from 'sonner';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { Link, Navigate } from 'react-router-dom';
import 'animate.css';

function Home() {
  const { handleLogin, handleValidarToken, autenticado } =
    useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState('senha');
  const [senha, setSenha] = useState('senha');
  const [loading, setLoading] = useState('senha');
  const access_token = window.localStorage.getItem('token');
  useEffect(() => {
    if (access_token) {
      handleValidarToken(access_token)
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [access_token]);

  console.log(autenticado);
  if (autenticado) return <Navigate to={'lista'} />;
  async function handleSubmit(event) {
    event.preventDefault();
    handleLogin(usuario, senha);
  }

  function seePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div
      className={`${styles.App} ${styles.Home} animate__animated animate__fadeInLeft`}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          <CoffeeIcon fontSize="large" />
          <h1>Entre</h1>
        </div>
        <Box
          component="form"
          autoComplete="on"
          onSubmit={handleSubmit}
          className={styles.boxForm}
        >
          <TextField
            value={usuario}
            id="usuario"
            label="usuario"
            variant="outlined"
            onChange={(e) => setUsuario(e.target.value)}
          />
          <TextField
            value={senha}
            id="password"
            label="Senha"
            type={showPassword ? 'text' : 'Password'}
            variant="outlined"
            onChange={(e) => setSenha(e.target.value)}
          />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox onClick={seePassword} />}
              label="Ver senha ?"
            />
            <Link to={'cadastrar'} className={styles.cadastrarse}>
              Cadastrar-se
            </Link>
          </FormGroup>

          <Button type="submit" variant="contained">
            Entrar
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Home;
