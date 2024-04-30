const API_URL = import.meta.env.VITE_APP_API;
const username = import.meta.env.VITE_APP_BASIC_AUTH_USER;
const password = import.meta.env.VITE_APP_BASIC_AUTH_PASSWORD;
export function AUTENTICAR_POST(body) {
  return {
    url: API_URL + '/autenticar',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      },
      body: JSON.stringify(body),
    },
  };
}

export function VALIDAR_TOKEN_POST(body) {
  return {
    url: API_URL + '/validartoken',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      },
      body: JSON.stringify(body),
    },
  };
}
export function LISTA_COMPRAS_GET() {
  return {
    url: API_URL + '/lista',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      },
    },
  };
}
export function FILA_GET() {
  return {
    url: API_URL + '/filacafe',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      },
    },
  };
}

export function ATUALIZAR_FILA_PUT(body) {
  console.log(body);
  return {
    url: API_URL + '/atualizarfila',
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      },
      body: JSON.stringify(body),
    },
  };
}
export function REGISTRAR_COMPRA_POST(body) {
  return {
    url: API_URL + '/registrarcompra',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      },
      body: JSON.stringify(body),
    },
  };
}
