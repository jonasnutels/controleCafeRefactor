const API_URL = 'http://localhost:3000';
const username = 'usu';
const password = 'pass';
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
