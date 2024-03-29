# NG.Transfer

Aplicação que tem como objetivo realizar transações financeiras entre contas de usuários da plataforma. Nela pode-se realizar registro de novos usuários, login, transferência de valores, verificar histórico de transações. Projeto realizado para um desafio técnico.

## Requisitos

- NodeJs v16
- Banco de dados PostgresSQL
- \*Opicional: Docker e Docker-compose

## Tecnologias usadas no back-end

- NodeJs
- NestJs
- Prisma
- Postgres
- JWT - Json Web Token
- Bcrypt
- Swagger Ui Express

## Tecnologias usadas no front-end

- NextJs
- Tailwind CSS
- Axios
- js-cookie

## Funcionalidades

- Registro de novos usuários
- Login na aplicação
- Realizar transferência de valores
- Verificar histórico de transaçoes

## Rodando localmente

#### clone o repositório

```bash
git clone git@github.com:eemr3/desafio-ng-cash.git
```

#### Entrar na pasta

```bash
cd desafio-ng-cash
```

Instalar as dependencias

```bash
npm install
```

- Observação: Se ocorreru um erro de permisão para o o arquivo `app_install.sh` rode o comando abaixo no terminal, isso para o sitema operacional Linux:

```bash
chmod +x apps_install.sh
```

Variáveis de Ambiente
Entre na pasta

```bash
cd apps/server
```

E renomei o arquivo

```bash
.env.example para .env
```

Subir containers

- Volte para a pasta `desafio-ng-cash` e rode o comando abaixo

```bash
npm run compose:up
```

Criar banco de dados

```bash
npm run database
```

A aplicação roda na porta:

```bash
http://localhost:3000
```

##### Registros

Você deverá cadastrar usuários na aplicação para relizar transações.
Para realizar transações é necessário ter 2 contas pelo menos. Para criar contas dever ter `nome de usuário` e `senha`

- `nome de usuário` tem que ter no minimo 3 caracteres
- `senha` tem que ter no mínimo 8 caracteres, sendo que pelo menos um número e uma letra minúscula e uma maiúscula.

Exemplo:

```bash
username: jonh
senha: a123456B
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

- Renomei o arquivo `.env.exemple` para `.env`

- Altere os valores das variáveis para os valores que você usa no banco de dados que esta instalado na sua máquina

```bash
DATABASE_URL=

SECRET_KEY=
```

## Documentação da API

Após feito os primeiros passos de entar na pasta, instalar as dempendências, subir os container.
Acesse o seu navegador e digite ou copie e cole o seguinge:

```bash
http://localhost:3001/api
```

E tera ascesso a Documentação da API criada utilizando o Swagger Ui Express

## Autor

- [@eemr3](https://www.github.com/eemr3)
