# Fiscalize-API-V1

API backend em Node.js para apoio ao controle financeiro, com autenticação JWT, persistência em MySQL via Sequelize e proteção contra abuso de requisições com rate limit e slow down.

## Funcionalidades

- Cadastro, login e gerenciamento de usuários.
- Controle de bancos cadastrados pelo usuário.
- Controle de tipos de pagamento.
- Registro, listagem, edição e exclusão de despesas extras.
- Autenticação com token JWT.
- Sincronização automática do banco de dados ao iniciar a aplicação.

## Tecnologias

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcryptjs
- cors
- express-rate-limit
- express-slow-down

## Pré-requisitos

- Node.js 18+.
- MySQL em execução.
- Um arquivo `.env` configurado na raiz do projeto.

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Configure o arquivo `.env` com as variáveis necessárias.

## Variáveis de ambiente

O projeto utiliza as seguintes variáveis:

- `PORT`: porta em que a API será executada.
- `MYSQLUSER`: usuário do MySQL.
- `MYSQLPASSWORD`: senha do MySQL.
- `MYSQLDATABASE`: nome do banco de dados.
- `MYSQLHOST`: host do banco de dados.
- `MYSQLPORT`: porta do MySQL.
- `DB_DIALECT`: dialect do Sequelize, normalmente `mysql`.
- `JWT_SECRET`: segredo usado para assinar os tokens JWT.
- `MAX_LOGIN_ATTEMPTS`: número máximo de tentativas de login antes do bloqueio.
- `ROOT_SYSTEM`: identificador do usuário root do sistema.

Exemplo de `.env`:

```env
PORT=3000
MYSQLUSER=root
MYSQLPASSWORD=sua_senha
MYSQLDATABASE=fiscalize_financas
MYSQLHOST=localhost
MYSQLPORT=3306
DB_DIALECT=mysql
JWT_SECRET=uma_chave_forte
MAX_LOGIN_ATTEMPTS=5
ROOT_SYSTEM=SEU_ID_ROOT
```

## Scripts

- `npm start`: inicia a aplicação com `node server.js`.
- `npm run dev`: inicia a aplicação com `nodemon`.
- `npm test`: executa os testes com Jest.

## Execução

Para rodar em desenvolvimento:

```bash
npm run dev
```

Para rodar em modo normal:

```bash
npm start
```

Ao iniciar, a API realiza a autenticação com o banco e executa `sequelize.sync({ force: false })` para garantir a existência das tabelas.

## Rotas da API

A API expõe os seguintes grupos de rotas:

### Usuários

Base: `/api/users`

- `POST /login`
- `POST /register`
- `GET /list-users` `auth`
- `GET /:id` `auth`
- `PUT /update/:id` `auth`
- `DELETE /delete/:id` `auth`
- `PUT /new-admin` `auth`
- `PUT /inative-user` `auth`
- `POST /send-code`
- `POST /reset-password`

### Bancos

Base: `/api/banks`

- `POST /register` `auth`
- `GET /list` `auth`
- `PUT /update/:id` `auth`
- `DELETE /delete/:id` `auth`

### Tipos de pagamento

Base: `/api/type-payments`

- `POST /register` `auth`
- `GET /list` `auth`
- `PUT /update` `auth`
- `DELETE /delete` `auth`

### Despesas extras

Base: `/api/extra-purchase`

- `POST /register` `auth`
- `POST /update` `auth`
- `POST /list` `auth`
- `POST /delete` `auth`
- `GET /:id` `auth`

## Autenticação

As rotas protegidas exigem o cabeçalho:

```http
Authorization: Bearer <seu_token_jwt>
```

## Estrutura do projeto

```text
controllers/        Regras de negócio da API
db/                 Configuração e modelos do Sequelize
middleware/         Middlewares de autenticação e proteção
migrations/         Migrações do banco de dados
routes/             Definição das rotas da API
server.js           Entrada principal da aplicação
```

## Observações

- A API utiliza controle de tentativas de login e bloqueio temporário de conta por segurança.
- O servidor aplica rate limit global e atraso progressivo em excesso de requisições.
- Algumas rotas recebem listas no corpo da requisição para operações em lote.

## Licença

ISC
