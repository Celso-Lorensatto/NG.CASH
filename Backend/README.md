### Documentação API

<p>As funcionalidades da api foram distribuídas semânticamente em :</p>

<h4>/user</h4>
<h4>/account</h4>
<h4>/transaction</h4>

<p>Em cada um deles contendo endpoint's específicos para um tipo de tarefa designada.</p>


___

<code>POST /user/newAccount</code>

<strong>Função:</strong>
<p> Cria uma nova conta para o usuário.</p>
<strong>Corpo do Request:</strong>

```json
{
  "username":"@usuario",
  "password":"1234567C"
}
```
<strong>Response:</strong>

StatusCode: 201

```json
{
  "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjljMTIyNzA5LWI5NTEtNDA4NS04ZDE4LTY2ZTFmOGMzYWQ1NyIsImlhdCI6MTY2OTA3OTU2NywiZXhwIjoxNjY5MTY1OTY3fQ.s3AuN0YCjC98Eh1G0vDiaZjzEnmiAEg3ZdBNMc4qolI",
    "data": {
        "user": {
            "id": "9c122709-b951-4085-8d18-66e1f8c3ad57",
            "username": "@usuario",
            "accountId": "f3709f7e-99b0-42a6-ba41-9a3e3a082cd7"
        }
    }
}
```

<strong>observação:</strong>

- <kbd>username</kbd> no mínimo 3 letras ou números.
- <kbd>password</kbd> no mínimo 8 caracteres e 1 letra maiúscula.
___

<code>POST /user/login</code>

<strong>Função:</strong>
<p>Retorna um token válido para o usuário já cadastrado e seta um cookie <kbd>jwt</kbd> com o valor do token.</p>
<strong>Corpo do Request:</strong>

```json
{
  "username":"@usuario",
  "password":"1234567C"
}
```
<strong>Response:</strong>

StatusCode: 200

```json
{
  "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjljMTIyNzA5LWI5NTEtNDA4NS04ZDE4LTY2ZTFmOGMzYWQ1NyIsImlhdCI6MTY2OTA3OTU2NywiZXhwIjoxNjY5MTY1OTY3fQ.s3AuN0YCjC98Eh1G0vDiaZjzEnmiAEg3ZdBNMc4qolI",
    "data": {
        "user": {
            "id": "9c122709-b951-4085-8d18-66e1f8c3ad57",
            "username": "@usuario",
            "accountId": "f3709f7e-99b0-42a6-ba41-9a3e3a082cd7"
        }
    }
}
```


___

<code>GET /user/logout</code>

<strong>Função:</strong>
<p>Manda um cookie <kbd>jwt</kbd> com o valor 'loggedout' para excluir o token armazenado no login.</p>

<strong>Response:</strong>

StatusCode: 204 No Content

```json
{
  "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjljMTIyNzA5LWI5NTEtNDA4NS04ZDE4LTY2ZTFmOGMzYWQ1NyIsImlhdCI6MTY2OTA3OTU2NywiZXhwIjoxNjY5MTY1OTY3fQ.s3AuN0YCjC98Eh1G0vDiaZjzEnmiAEg3ZdBNMc4qolI",
    "data": {
        "user": {
            "id": "9c122709-b951-4085-8d18-66e1f8c3ad57",
            "username": "@usuario",
            "accountId": "f3709f7e-99b0-42a6-ba41-9a3e3a082cd7"
        }
    }
}
```
___

<code>GET /user/:username</code>

<strong>Função:</strong>
<p>Endpoint criado para verificar se o usuário existe, <kbd>:username</kbd> é onde deve ser inserido o nome de qualquer usuário.</p>

<strong>Request:</strong>

<code>/user/usuario</code>

<strong>Response:</strong>

StatusCode: 200

```json
{
  "status": "ok",
    "data": {
        "user": {
            "id": "9c122709-b951-4085-8d18-66e1f8c3ad57",
            "username": "@usuario"
        }
    }
}
```


___

### JWT

<p>Abaixo são os endpoint's que contém uma camada de segurança JWT (JSON Web Token).</p>
<p>Estes endpoint's retornam dados sensíveis, logo terão que passar por um tipo de autenticação de um token fornecido pelos endpoint's <code>/user/newAccount</code>( Quando um usuário novo for criado), <code>/user/login</code>(Quando o usuário logar em sua conta), este mesmo token contém informações que permitirá executar funções baseadas no usuário mencionado no token.</p>

<p>Sendo assim, para estes endpoint's é necessário que no headers.authorization seja adicionado o padrão <code>BEARER {seu token aqui}</code> para que :</p>

- O sistema permita a execução do endpoint.
- O sistema saiba a quem se trata a operação.

#### Imaginando um cenário em que o usuário abaixo esta autenticado:

```json
{
  "username":"@usuario",
  "password":"1234567C"
}
```

___

<code>GET /user/me</code>

<strong>Função:</strong>
<p>Endpoint criado com a finalidade de validar o token(JWT) para verificar se o usuário ainda esta autenticado.</p>


<strong>Response:</strong>

StatusCode: 200

```json
{
    "status": "ok",
    "data": {
        "id": "9c122709-b951-4085-8d18-66e1f8c3ad57",
        "username": "@usuario"
    }
}
```
___

<code>GET /transaction</code>

<strong>Função:</strong>
<p>Retonar um objeto contendo uma estrutura de dados baseado nas transações bancárias da conta autenticada.</p>


<strong>Response:</strong>

StatusCode: 200

```json
{
    "result": {
        "totalPages": 2,
        "currentPage": 1,
        "results": 10,
        "transactions": [
            {
                "id": "34af068f-737b-4e39-b315-c0750787ae30",
                "value": "5",
                "createdAt": "2022-11-21T17:32:27.113Z",
                "from": "@usuario",
                "to": "@usuario2"
            },
            {
                "id": "e03a74af-fbde-4217-9bbb-2c6dd17d076f",
                "value": "5",
                "createdAt": "2022-11-21T17:32:01.667Z",
                "from": "@usuario2",
                "to": "@usuario"
            },
            {
                "id": "ce5f11a8-4d72-4711-957a-d9392d3e8dbd",
                "value": "5",
                "createdAt": "2022-11-21T17:31:57.686Z",
                "from": "@usuario",
                "to": "@usuario3"
            },
            {
                "id": "71194a95-f660-4db5-ab82-e03ca95e86f7",
                "value": "5",
                "createdAt": "2022-11-21T17:31:53.778Z",
                "from": "@usuario",
                "to": "@usuario2"
            },
            {
                "id": "0d373312-1057-4f49-81ea-3d9d6614a2fc",
                "value": "5",
                "createdAt": "2022-11-21T17:31:49.312Z",
                "from": "@usuario",
                "to": "@usuario3"
            },
            {
                "id": "ced79482-0c69-4b24-bf6e-f779881a8693",
                "value": "5",
                "createdAt": "2022-11-21T17:31:44.798Z",
                "from": "@usuario3",
                "to": "@usuario"
            },
            {
                "id": "77a9a53b-d9f4-44b1-b028-db38060da405",
                "value": "5",
                "createdAt": "2022-11-21T17:31:40.887Z",
                "from": "@usuario",
                "to": "@usuario2"
            },
            {
                "id": "98cde2f9-9e73-4f10-b722-964f471884e6",
                "value": "5",
                "createdAt": "2022-11-21T17:31:36.304Z",
                "from": "@usuario",
                "to": "@usuario3"
            },
            {
                "id": "85cf5fa6-f657-4c49-9b1f-49d7ff982aa3",
                "value": "5",
                "createdAt": "2022-11-21T17:31:32.070Z",
                "from": "@usuario2",
                "to": "@usuario"
            },
            {
                "id": "2e2b1e27-bf09-494e-9e15-9006f7695b75",
                "value": "5",
                "createdAt": "2022-11-21T17:31:28.490Z",
                "from": "@usuario3",
                "to": "@usuario"
            }
        ]
    }
}
```

<strong>Atributos do Response:</strong>

<code>totalPages:</code> - Número de todas as páginas
<code>currentPage:</code> - Página Atual
<code>result:</code> - Número de transações encontradas
<code>transactions:</code> - lista de objetos contendo dados sobre cada transação encontrada.

<strong>Atributos de cada objeto em <code>transctions</code></strong>

<code>id:</code> - Número de identificação da transação
<code>value:</code> - Valor transferido de uma conta para outra.
<code>createdAt:</code> - data e hora que ocorreu a transação.
<code>from:</code> - de que conta a quantia foi retirada.
<code>to:</code> - conta que a quantia foi atraibuída.


<strong>Parâmetros</strong>

<p>É possível filtrar a lista de trasações por parâmetros na requisição</p>



<h3>Param:<code>date</code></h3>

<strong>Função:</strong>

<p>transactions retornará somente as transações do dia especificado.</p>

Valor possível no padrão: AAAA-MM-DD (Ano-Mes-Dia)

<strong>Exemplo</strong>

<p>Para a data 15/11/2022 ficará assim: </p>

<code>/transaction?date=2022-11-15</code>

<h3>Param:<code>type</code></h3>

<strong>Função:</strong>

<p>transactions retornará somente as transações baseadas em se o valor da transação foi creditado ou debitado da conta do usuário.</p>

<p>Valores possíveis:</p>

<kbd>cash-in</kbd> - para filtra por creditos na conta.

<kbd>cash-out</kbd> - para filtrar por debitos na conta.

<strong>Exemplo</strong>

<p>Para quere somente ter acesso as transações que debitaram da conta do usuário para outro, temos o seguinte formato:</p>

<code>/transaction?type=cash-out</code>

<h3>Param:<code>page</code></h3>

<strong>Função:</strong>

<p>como <code>/transaction</code> retorna no máximo 10 transações por request, o parâmetro page alterna entra a paginação, para ter acesso as transações mais antigas.</p>

<p>valor possível:</p>

<p>o número da página de transações a qual o usuário tem a intenção de consultar.</p>


<strong>Exemplo</strong>

<p>Tendo o seguinte objeto retornado ao fazer um request para <code>/transaction</code></p>

```json
{
    "result": {
        "totalPages": 2,
        "currentPage": 1,
        "results": 10,
        "transactions": [
            {
                "id": "34af068f-737b-4e39-b315-c0750787ae30",
                "value": "5",
                "createdAt": "2022-11-21T17:32:27.113Z",
                "from": "@usuario",
                "to": "@usuario2"
            },
            {
                "id": "e03a74af-fbde-4217-9bbb-2c6dd17d076f",
                "value": "5",
                "createdAt": "2022-11-21T17:32:01.667Z",
                "from": "@usuario2",
                "to": "@usuario"
            },
            {
                "id": "ce5f11a8-4d72-4711-957a-d9392d3e8dbd",
                "value": "5",
                "createdAt": "2022-11-21T17:31:57.686Z",
                "from": "@usuario",
                "to": "@usuario3"
            },
            {
                "id": "71194a95-f660-4db5-ab82-e03ca95e86f7",
                "value": "5",
                "createdAt": "2022-11-21T17:31:53.778Z",
                "from": "@usuario",
                "to": "@usuario2"
            },
            {
                "id": "0d373312-1057-4f49-81ea-3d9d6614a2fc",
                "value": "5",
                "createdAt": "2022-11-21T17:31:49.312Z",
                "from": "@usuario",
                "to": "@usuario3"
            },
            {
                "id": "ced79482-0c69-4b24-bf6e-f779881a8693",
                "value": "5",
                "createdAt": "2022-11-21T17:31:44.798Z",
                "from": "@usuario3",
                "to": "@usuario"
            },
            {
                "id": "77a9a53b-d9f4-44b1-b028-db38060da405",
                "value": "5",
                "createdAt": "2022-11-21T17:31:40.887Z",
                "from": "@usuario",
                "to": "@usuario2"
            },
            {
                "id": "98cde2f9-9e73-4f10-b722-964f471884e6",
                "value": "5",
                "createdAt": "2022-11-21T17:31:36.304Z",
                "from": "@usuario",
                "to": "@usuario3"
            },
            {
                "id": "85cf5fa6-f657-4c49-9b1f-49d7ff982aa3",
                "value": "5",
                "createdAt": "2022-11-21T17:31:32.070Z",
                "from": "@usuario2",
                "to": "@usuario"
            },
            {
                "id": "2e2b1e27-bf09-494e-9e15-9006f7695b75",
                "value": "5",
                "createdAt": "2022-11-21T17:31:28.490Z",
                "from": "@usuario3",
                "to": "@usuario"
            }
        ]
    }
}
```

perceba que o atributo <code>totalPages</code> menciona o total de páginas disponíveis baseado naquela consulta, e  que<code>currentpage</code> menciona a página que o usuário esta.

<p>Para ter acesso ao resto das transações, temos então o seguinte endpoint</p>

<code>/transaction?page=2</code>


___

<code>POST /transactions/new</code>

<strong>Função:</strong>
<p>Envia uma quantia para a conta especificada no corpo da requisição.</p>


<strong>Corpo do Request:</strong>

```json
{
    "value":50,
    "username":"@usuario3"
}
```
<strong>Response:</strong>

StatusCode: 200

```json
{
  "status":"Sucesso",
        "data":{
            "newTransaction": {
            "id": "a3866074-a47a-4b2d-b3b3-7502f49ccdf0",
            "value": "50",
            "createdAt": "2022-11-22T02:48:30.621Z",
            "debitedAccountId": "d66d1cd6-b31f-4815-a357-acde907e191d",
            "creditedAccountId": "9e6a4923-c9a0-405c-bdca-d2878ef5b275"
        }
        }
}
```

<strong>observação:</strong>

- <kbd>value</kbd> Não pode ser maior do que o saldo da conta do usuário autenticado.
- <kbd>username</kbd> deve ser um usuário cadastrado.

___

<code>GET /account</code>

<strong>Função:</strong>
<p>Recupera os dados principais da conta do usuário autenticado </p>

<strong>Response:</strong>

StatusCode: 200 No Content

```json
{
    "username": "@usuario",
    "balance": "90",
    "transactions": {
    "result": {
        "totalPages": 2,
        "currentPage": 1,
        "results": 10,
        "transactions": [
            {
                "id": "34af068f-737b-4e39-b315-c0750787ae30",
                "value": "5",
                "createdAt": "2022-11-21T17:32:27.113Z",
                "from": "@usuario",
                "to": "@usuario2"
            },
            {
                "id": "e03a74af-fbde-4217-9bbb-2c6dd17d076f",
                "value": "5",
                "createdAt": "2022-11-21T17:32:01.667Z",
                "from": "@usuario2",
                "to": "@usuario"
            },
            {
                "id": "ce5f11a8-4d72-4711-957a-d9392d3e8dbd",
                "value": "5",
                "createdAt": "2022-11-21T17:31:57.686Z",
                "from": "@usuario",
                "to": "@usuario3"
            },
            {
                "id": "71194a95-f660-4db5-ab82-e03ca95e86f7",
                "value": "5",
                "createdAt": "2022-11-21T17:31:53.778Z",
                "from": "@usuario",
                "to": "@usuario2"
            },
            {
                "id": "0d373312-1057-4f49-81ea-3d9d6614a2fc",
                "value": "5",
                "createdAt": "2022-11-21T17:31:49.312Z",
                "from": "@usuario",
                "to": "@usuario3"
            },
            {
                "id": "ced79482-0c69-4b24-bf6e-f779881a8693",
                "value": "5",
                "createdAt": "2022-11-21T17:31:44.798Z",
                "from": "@usuario3",
                "to": "@usuario"
            },
            {
                "id": "77a9a53b-d9f4-44b1-b028-db38060da405",
                "value": "5",
                "createdAt": "2022-11-21T17:31:40.887Z",
                "from": "@usuario",
                "to": "@usuario2"
            },
            {
                "id": "98cde2f9-9e73-4f10-b722-964f471884e6",
                "value": "5",
                "createdAt": "2022-11-21T17:31:36.304Z",
                "from": "@usuario",
                "to": "@usuario3"
            },
            {
                "id": "85cf5fa6-f657-4c49-9b1f-49d7ff982aa3",
                "value": "5",
                "createdAt": "2022-11-21T17:31:32.070Z",
                "from": "@usuario2",
                "to": "@usuario"
            },
            {
                "id": "2e2b1e27-bf09-494e-9e15-9006f7695b75",
                "value": "5",
                "createdAt": "2022-11-21T17:31:28.490Z",
                "from": "@usuario3",
                "to": "@usuario"
            }
        ]
    }
}
}
```