# Card Tokenization API

API para tokenización de tarjetas de crédito/débito según requerimientos técnicos.

## Requisitos

- Node.js v20+
- mysql

## Configuración

1. Clonar el repositorio
2. Instalar dependencias: `npm install`


## Comandos

### ejecutar el proyecto

npx ts-node src/app.ts



# Compilar para producción (EKS)
npm run build

# Ejecutar pruebas localmente
npm test



## Endpoints



📘 API de Tokens y Tarjetas
Esta API permite generar y consultar tokens seguros asociados a tarjetas, así como recuperar datos de tarjeta utilizando el token correspondiente.

🔐 Headers requeridos
Todas las solicitudes deben incluir el siguiente encabezado:

public-key: testkey123

📌 Endpoints
1. Generar un token
POST /tokens

Crea un token temporal para una tarjeta de crédito.

🔸 Headers:
Content-Type: application/json  
public-key: testkey123
🔸 Body (JSON):
{
  "card_number": "4111111111111111",
  "cvv": "123",
  "expiration_month": "12",
  "expiration_year": "2025",
  "email": "jorge@gmail.com"
}

🔸 Respuesta exitosa (200):
{
  "token": "44074687e1655bb4066068c95aa25a71"
}


2. Consultar token (GET)
GET /tokens/:token

Consulta un token específico para validar su existencia o estado.
ejemplo
curl --location --request GET 'http://localhost:3000/tokens/44074687e1655bb4066068c95aa25a71' \
--header 'public-key: testkey123'

Respuesta esperada:
{
    "card_number": "4111111111111111",
    "cvv": "123",
    "expiration_month": "12",
    "expiration_year": "2025",
    "email": "jorge@gmail.com"
}

3. Obtener datos de la tarjeta desde un token
GET /cards/:token

Este endpoint devuelve los datos de la tarjeta sin incluir el campo cvv.

curl --location 'http://localhost:3000/cards/ebe1a7b0b485fdb0767d2742573336ae' \
--header 'public-key: testkey123'


Respuesta esperada:



{
  "card_number": "4111111111111111",
  "expiration_month": "12",
  "expiration_year": "2025",
  "email": "jorge@gmail.com"
}
