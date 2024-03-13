import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, TextField, FormGroup, Button } from '@mui/material';
import styles from './Cadastro.module.css';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import { UserContext } from '../../userContext';
import { toast } from 'sonner';
function Cadastro() {
  const { cadastrarComEmail } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirm, setSenhaConfirm] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    if (senha === senhaConfirm) {
      cadastrarComEmail(email, senha);
    } else {
      toast.error('A senha precisa ser igual !');
    }
  }
  function seePassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div className={`${styles.App} ${styles.Home}`}>
      <div className={styles.container}>
        <div className={styles.title}>
          <CoffeeIcon fontSize="large" />
          <h1>Cadastre-se</h1>
        </div>
        <Box
          component="form"
          autoComplete="on"
          onSubmit={handleSubmit}
          className={styles.boxForm}
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Senha"
            type={showPassword ? 'text' : 'Password'}
            variant="outlined"
            onChange={(e) => setSenha(e.target.value)}
          />
          <TextField
            id="password-confirm"
            label="Confirmar Senha"
            type={showPassword ? 'text' : 'Password'}
            variant="outlined"
            onChange={(e) => setSenhaConfirm(e.target.value)}
          />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox onClick={seePassword} />}
              label="Ver senha ?"
            />
          </FormGroup>

          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Cadastro;
