## Desafio:

Estruturar uma aplicação web *fullstack*, ***dockerizada***, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

lista de Tarefas:

- [x] Criar estrutura de ambiente de teste.
  - [x] Configurar o Banco de dados Postgresql.
  - [x] Instalar dependências para rodar o projeto (Typescript, Prisma, NodeJs).
  - [x] Configurar o Prisma para mapeamento e ajuste de constraints de Entidades do banco de dados.
- [ ] Comprimento das regras de negócio
  - [x] Cadastro de usuário por username e password
    - [x] username único e composto por no mínimo 3 caracteres.
    - [x] password deve conter : Mínimo 8 caracteres, um número e uma letra maiúscula.
    - [x] Senha deve ser criptografada enquanto estiver no banco
  - [x] Após o cadastro será populado na tabela Accounts sendo esse lançamento contendo um saldo de R$ 100 iniciais na conta.
  - [ ] Sistema de controle de sessão de usuário por JWT.
  - [ ] Usuário logado sera capaz de somenter ter acesso aos dados de sua conta.
  - [ ] Usuário logado será capaz de fazer transferências para outras contas.
    - [ ] Não poderá fazer tranferências para si.
    - [ ] Não poderá fazer transferencias que excedem o valor do seu saldo atual.
    - [ ] Todas as Tranferências bem-sucedidas serão inseridas na tabela Transactions.
    - [ ] Usuário será capaz de ter acesso a todos os recebimentos e transferências relacionados a sua conta.
    - [ ] Usuário poderá filtrar suas transações por : Data de realização E/OU Cash-in, cash-out.