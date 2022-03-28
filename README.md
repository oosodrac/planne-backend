<p align="center">
  Backend do App: Balde de frutas
</p>

## Description
 
URI´s.

BALDES:

(http://localhost:8080/api/v1/baldes) - (GET) Buscar todos os baldes
<br/>
(http://localhost:8080/api/v1/baldes/id) - (GET) Buscar balde pelo id
<br/>
(http://localhost:8080/api/v1/baldes/id) - (DELETE) Remover balde pelo id
<br/>

(http://localhost:8080/api/v1/baldes) - (POST) Add balde -> payload : { "nome": "nome-balde", "capacidade": 1}
<br/>
(http://localhost:8080/api/v1/baldes/id) - (PUT) Update balde -> payload : { "nome": "nome-balde", "capacidade": 1 }

<br/>
FRUTAS:

<br/>
(http://localhost:8080/api/v1/frutas) - (GET) Buscar todos as frutas

<br/>
(http://localhost:8080/api/v1/frutas/id) - (GET) Buscar fruta pelo id

<br/>
(http://localhost:8080/api/v1/frutas/id) - (DELETE) Remover fruta pelo id

<br/>
(http://localhost:8080/api/v1/frutas) - (POST) Add fruta -> payload : { "nome": "nome-balde", "preco": 1, "expiracao": 1 }
<br/>
(http://localhost:8080/api/v1/frutas/id) - (PUT) Update fruta -> payload : { "nome": "nome-balde", "preco": 1, "expiracao": 1 }

<br/>
DEPOSITO DE FRUTA:

<br/>
(http://localhost:8080/api/v1/balde-frutas) - (GET) Buscar todos os depositos
<br/>
(http://localhost:8080/api/v1/balde-frutas/id) - (GET) Buscar deposito pelo id
<br/>
(http://localhost:8080/api/v1/balde-frutas/balde/fruta) - (DELETE) Remover deposito

(http://localhost:8080/api/v1/balde-frutas) - (POST) Add deposito -> payload : { "balde": "", "fruta": "" }
<br/>
(http://localhost:8080/api/v1/balde-frutas/id) - (PUT) Update deposito -> payload : { "balde": "", "fruta":""}

<br/>

(http://localhost:8080/api/v1/balde-frutas/resumo) - (GET) Buscar estatistica dos baldes
<br/>
(http://localhost:8080/api/v1/balde-frutas/balde/nome) - (GET) Buscar estatistica pelo nome do balde
<br/>
(http://localhost:8080/api/v1/balde-frutas/sse-resumo) - (GET) Evento de estatistica

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Ramiro Cardoso]

## License

Nest is [MIT licensed](LICENSE).
