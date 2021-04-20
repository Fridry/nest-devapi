# Desafio de código Backend NodeJS

## Descrição

API criada para o desafio da vaga de desenvolvedor Backend.

## Objetivos principais:

- [x] Criação de uma API utilizando NestJs;
- [x] Implementar autenticação, capturando token no formato Bearer;
- [x] Utilizar o ODM Mongoose;
- [x] Utilizar o MongoDB Atlas para armazenamento;
- [x] Implementar rotas;
- [x] Implementar validação dos dados;
- [x] Implementar seeds para popular os conectores;

## Objetivos secundários:

- [ ] Implementar testes;
- [ ] Documentar a API utilizando o Swagger;

## Tecnologias usadas:

- NestJs;
- TypeScript;
- MongoDB;
- Mongoose;
- JSON Web Token;
- Passport;
- Bcrypt;

## Instalação

```bash
$ npm install
```

## Rodar a API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Popular a base de dados com conectores

```bash
$ npx nestjs-command create:connector
```
