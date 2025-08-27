# 🚀 Sales API

[![Status: Em Desenvolvimento](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange)](https://github.com/seu-usuario/sales-api)

Uma API robusta para gerenciamento de vendas e clientes, construída com NestJS, Prisma e PostgreSQL.

## 📋 Descrição

A Sales API é uma aplicação backend desenvolvida em NestJS que oferece as seguintes funcionalidades até o momento:
- **Autenticação e Autorização** de usuários
- **Gerenciamento de Usuários** com diferentes níveis de acesso
- **Gestão de Clientes** (pessoas físicas e jurídicas)
- **Sistema de Validação** robusto com class-validator
- **Documentação automática** com Swagger

## 🛠️ Tecnologias Utilizadas

- **Framework**: NestJS 11
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma 6
- **Autenticação**: JWT + Passport
- **Validação**: class-validator + class-transformer
- **Testes**: Jest
- **Containerização**: Docker
- **Linting**: ESLint + Prettier

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Yarn ou npm

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd sales-api
```

### 2. Instale as dependências

```bash
yarn install
# ou
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do Banco de Dados
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=sales_api
DB_PORT=5432
DB_URL=postgresql://${DB_USERNAME}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_DATABASE}

# Configurações da API
PORT=3000

# JWT Secret (gere uma chave segura)
JWT_SECRET=sua_chave_jwt_aqui
```

### 4. Inicie o banco de dados

```bash
docker-compose up -d postgres
```

### 5. Execute as migrações do Prisma

```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrações
npx prisma migrate dev

# (Opcional) Visualize o banco com Prisma Studio
npx prisma studio
```

### 6. Inicie a aplicação

```bash
# Desenvolvimento
yarn start:dev

# Produção
yarn build
yarn start:prod
```

A API estará disponível em: `http://localhost:3000`

## 📚 Documentação da API

Após iniciar a aplicação, acesse a documentação Swagger em:
`http://localhost:3000/api-docs`

## 🏗️ Estrutura do Projeto

```
src/
├── modules/
│   ├── auth/           # Autenticação e autorização
│   ├── user/           # Gerenciamento de usuários
│   └── customer/       # Gestão de clientes
├── shared/             # Código compartilhado
│   ├── database/       # Configuração do banco
│   ├── exceptions/     # Tratamento de erros
│   └── domain/         # Entidades e objetos de valor
└── main.ts             # Ponto de entrada da aplicação
```

## 🔐 Funcionalidades Principais

### Autenticação (Auth Module)
- **Login** com email e senha
- **Autenticação JWT** para rotas protegidas
- **Guards** para controle de acesso
- **Estratégias** de autenticação local e JWT

### Usuários (User Module)
- **CRUD completo** de usuários
- **Sistema de roles** (USER, ADMIN)
- **Hash de senhas** com bcrypt
- **Validação** de dados de entrada

### Clientes (Customer Module)
- **Clientes Pessoa Física** (Individual Customer)
- **Clientes Pessoa Jurídica** (Business Customer)
- **Gestão de perfis** com atualizações
- **Validação** de dados específicos

## 🧪 Executando Testes

```bash
# Testes unitários
yarn test

# Testes em modo watch
yarn test:watch

# Cobertura de testes
yarn test:cov

# Testes end-to-end
yarn test:e2e
```

## 🐳 Docker

### Executar apenas o banco de dados
```bash
docker-compose up -d postgres
```

### Executar toda a aplicação (quando configurado)
```bash
docker-compose up -d
```

## 📝 Scripts Disponíveis

- `yarn start:dev` - Inicia em modo desenvolvimento com hot-reload
- `yarn build` - Compila o projeto para produção
- `yarn start:prod` - Inicia a aplicação em produção
- `yarn test` - Executa os testes
- `yarn lint` - Executa o linter
- `yarn format` - Formata o código com Prettier

## 🔧 Configurações de Desenvolvimento

### Linting e Formatação
O projeto utiliza ESLint e Prettier para manter a qualidade do código. Os hooks do Husky garantem que o código seja validado antes de cada commit.

### Estrutura de Testes
- **Testes Unitários**: Jest para lógica de negócio
- **Testes E2E**: Supertest para testes de integração
- **Factories**: Criação de dados de teste

## 🚨 Tratamento de Erros

O projeto implementa um sistema robusto de tratamento de erros com:
- **Exceções customizadas** para cada tipo de erro
- **Mapeamento** de erros de validação
- **Respostas padronizadas** para o cliente

## 📊 Banco de Dados

### Modelos Principais
- **User**: Usuários do sistema com roles
- **IndividualCustomer**: Clientes pessoa física
- **BusinessCustomer**: Clientes pessoa jurídica

### Migrações
As migrações são gerenciadas pelo Prisma e podem ser executadas com:
```bash
npx prisma migrate dev
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e não possui licença pública.

## 👥 Autores

- José Junior Dev

---

**Nota**: Certifique-se de configurar corretamente as variáveis de ambiente antes de executar o projeto. Em caso de dúvidas, consulte a documentação do Swagger ou entre em contato com a equipe de desenvolvimento.
