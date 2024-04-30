import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import styles from './listaControle.module.css';
import {
  Typography,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { UserContext } from '../../userContext';
import { format, parseISO } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
const columns = [
  { field: 'nome_comprador', headerName: 'Nome', width: 300 },
  {
    field: 'data_compra',
    headerName: 'Data da Compra',
    width: 162,
    renderCell: (params) => {
      const dataFormatada = format(new Date(params.value), 'dd/MM/yyyy');
      return <span>{dataFormatada}</span>;
    },
  },

  { field: 'tipo_cafe', headerName: 'Tipo do Café', width: 150 },
  { field: 'valor_total', headerName: 'Valor Total', width: 100 },
  {
    field: 'quantidade_kg',
    headerName: 'Kg',
    type: 'number',
    width: 90,
  },
  { field: 'fornecedor', headerName: 'Marca', width: 150 },
  { field: 'observacoes', headerName: 'Observações', width: 150 },
  {
    field: 'registrado_em',
    headerName: 'Data do Registro',
    width: 162,
    renderCell: (params) => {
      const dataFormatada = format(new Date(params.value), 'dd/MM/yyyy');
      return <span>{dataFormatada}</span>;
    },
  },

  {
    field: 'email_registros',
    headerName: 'Quem Registrou',
    width: 220,
    renderCell: (params) => {
      // Separando o e-mail pelo caractere '@' e pegando a parte antes do '@'
      const emailUsuario = params.value.split('@')[0];
      return <span>{emailUsuario}</span>;
    },
  },
];
export default function ListaControle() {
  // const [lista, setLista] = React.useState(['item 1']);
  const { getLista, lista, getFila, fila } = React.useContext(UserContext);
  React.useEffect(() => {
    getLista();
    getFila();
  }, []);
  const compraMaisRecente =
    lista.length > 0
      ? [...lista].sort(
          (a, b) => new Date(b.data_compra) - new Date(a.data_compra),
        )[0]
      : null;

  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          columnHeader: {
            backgroundColor: 'rgb(129 140 248)', // Cor do cabeçalho
            color: 'white',
            fontSize: '18px',
          },
        },
      },
    },
  });
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div className={styles.tableCafe}>
      <div className={styles.cardsContainer}>
        <Card
          sx={{
            width: { xs: '100%', md: 400 },
            height: 'auto',
            marginBottom: 5,
          }}
        >
          <CardContent>
            {compraMaisRecente
              ? formatDistanceToNow(compraMaisRecente.data_compra, {
                  locale: ptBR,
                  addSuffix: true,
                })
              : null}
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Último comprador:
            </Typography>
            <Typography variant="h7" gutterBottom>
              {compraMaisRecente && (
                <>
                  <p>Nome: {compraMaisRecente.nome_comprador}</p>
                  <p>
                    Data:{' '}
                    {format(
                      parseISO(compraMaisRecente.data_compra),
                      'dd/MM/yyyy',
                    )}
                  </p>
                  <p>Quantidade: {compraMaisRecente.quantidade_kg}</p>
                </>
              )}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: { xs: '100%', md: 400 },
            height: 'auto',
            marginBottom: 5,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Pessoas que não constam no sistema
            </Typography>
            <Typography variant="h7" gutterBottom>
              {fila.map((item, index) => (
                <li
                  key={index}
                  className={styles.listLi}
                  style={{
                    color: index === 0 ? 'red' : index === 1 ? '#FF6400' : null,
                  }}
                >
                  {index + 1} - {item.nome} -{' '}
                  {format(new Date(item.data_compra), 'dd/MM/yyyy')}
                  {index === 0 && <RemoveShoppingCartIcon />}
                </li>
              ))}
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Typography variant="h4" component="h4">
        Últimas compras
      </Typography>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={lista}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 100]}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </ThemeProvider>
    </div>
  );
}
