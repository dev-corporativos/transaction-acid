# Transaction ACID – Módulo com Transações em Banco de Dados
Este projeto foi desenvolvido para a disciplina Desenvolvimento de Sistemas Corporativos, tendo como objetivo implementar inserções em duas tabelas relacionadas utilizando transações ACID.

O sistema pode inserir dados simultaneamente em duas tabelas diferentes, caso qualquer parte do processo falhe, toda a operação é desfeita automaticamente via rollback. Caso bem sucedida, é realizado o commit confirmando a persistência dos dados.

## Fluxo da transação

1. A aplicação recebe os dados do usuário e do endereço
2. Uma transação é iniciada
3. O usuário é inserido em users
4. O ID gerado é usado para criar o endereço
5. Se ocorrer algum erro:
   * ❗ ROLLBACK
6. Se tudo funcionar:
   * ✔ COMMIT

## Modelagem do banco

O sistema utiliza duas tabelas relacionadas:

### Tabela users
| Campo |	Tipo |	Descrição |
|-------|------|------------|
| id |	integer (PK) |	Identificador único |
| name	| varchar |	Nome do usuário |
| age |	integer |	idade do usuário |

### Tabela address
| Campo |	Tipo |	Descrição |
|-------|------|------------|
| id |	integer (PK) |	Identificador único |
| user_id	| integer (FK) |	Referencia users.id |
| city	| varchar |	Nome da Cidade |
| street |	varchar |	Nome da Rua |

## Como executar o projeto

1. Clonar o repositório

   Você pode clonar o projeto de duas formas:
   * Via HTTPS
     ```
     git clone https://github.com/dev-corporativos/transaction-acid.git
     ```
   * Via SSH
     ```
     git clone git@github.com:dev-corporativos/transaction-acid.git
     ```
     
2. Acessar a pasta do projeto
   ```
   cd transaction-acid
   ```
3. Certifique-se de ter Docker + Docker Compose instalados.

4. Rode o comando:
   ```
   docker-compose up
   ```
## Como fazer uma inserção simultânea:

1. Você pode testar usando:

   * Insomnia
   * Postman
   * Thunder Client
   * curl

2. A API ficará disponível em:
   ```
   http://localhost:3000
   ```
4. Endpoint
   ```http
   POST /create
   ```
5. Exemplo de JSON para ser enviado:
   ```json
   {
     "name": "Fulano",
     "age": 21,
     "address": {
       "street": "Rua Central",
       "city": "Currais Novos"
     }
   }
   ```
6. Resposta esperada no SUCESSO (COMMIT):
   ```json
   {
     "message": "Transação concluída com sucesso!",
     "user": {
       "name": "Fulano",
       "age": 21,
       "id": 2
     },
     "address": {
       "street": "Rua Central",
       "city": "Currais Novos",
       "user": {
         "id": 2,
         "name": "Fulano",
         "age": 21
       },
         "id": 1
     }
   }
   ```
7. Resposta esperada se der ERRO (ROLLBACK):
   ```json
   {
     "error": "Erro na transação",
     "details": {}
   }
   ```
   
## Equipe de Desenvolvimento
| Nome              | Matrícula   |
| ----------------- | ----------- |
| [Robério Júnior](https://github.com/roberio-junior) | *20241038060010* |
| [Jardson Alan](https://github.com/jardsonalan) | *20241038060006* |
| [Ian Galvão](https://github.com/Barr0ca) | *20241038060011* |
| [José Lucas](https://github.com/uluscaz-ifrn) | *20241038060003* |
