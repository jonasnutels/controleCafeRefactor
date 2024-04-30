import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
} from '@mui/material';
import { UserContext } from '../../userContext';

const RegistroCompra = () => {
  const { registrarCompra, usuario, atualizarFila } = useContext(UserContext);
  console.log(usuario);
  const [dadosCompra, setDadosCompra] = useState({
    nomeComprador: '',
    dataDaCompra: '',
    tipoCafe: '',
    quantidadeKg: '',
    fornecedor: '',
    valorTotal: 0,
    metodoPagamento: '',
    observacoes: '',
    email_registros: usuario.usuario,
  });
  const tiposCafe = ['Arábica', 'Robusta', 'Blend'];
  const metodosPagamento = ['Dinheiro', 'Cartão', 'Transferência'];

  const handleChange = (e) => {
    setDadosCompra({ ...dadosCompra, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registrarCompra(dadosCompra);
    await atualizarFila(usuario.id_serial, dadosCompra.dataDaCompra);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Registro de Compra
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label={
            <>
              Nome do Comprador <span style={{ color: 'red' }}>*</span>
            </>
          }
          name="nomeComprador"
          value={dadosCompra.nomeComprador}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label={
            <>
              Data da Compra <span style={{ color: 'red' }}>*</span>
            </>
          }
          type="date"
          name="dataDaCompra"
          value={dadosCompra.dataDaCompra}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Tipo de Café"
          name="tipoCafe"
          value={dadosCompra.tipoCafe}
          onChange={handleChange}
          margin="normal"
        >
          {tiposCafe.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label={
            <>
              Quantidade (Kg) <span style={{ color: 'red' }}>*</span>
            </>
          }
          name="quantidadeKg"
          type="number"
          value={dadosCompra.quantidadeKg}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Fornecedor"
          name="fornecedor"
          value={dadosCompra.fornecedor}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Valor Total"
          name="valorTotal"
          type="number"
          value={dadosCompra.valorTotal}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Método de Pagamento"
          name="metodoPagamento"
          value={dadosCompra.metodoPagamento}
          onChange={handleChange}
          margin="normal"
        >
          {metodosPagamento.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Observações"
          name="observacoes"
          value={dadosCompra.observacoes}
          multiline
          rows={4}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          name="email_registros"
          value={usuario.usuario}
          onChange={handleChange}
          margin="normal"
          disabled
        />
        <Button type="submit" variant="contained" color="primary">
          Registrar
        </Button>
      </form>
    </Container>
  );
};

export default RegistroCompra;
