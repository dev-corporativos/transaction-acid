# Transaction ACID – Módulo com Transações em Banco de Dados
Este projeto foi desenvolvido para a disciplina de Desenvolvimento de Sistemas Corporativos, tendo como objetivo implementar inserções em duas tabelas relacionadas utilizando transações ACID.

O sistema pode inserir dados simultaneamente em duas tabelas diferentes, caso qualquer parte do processo falhe, toda a operação é desfeita automaticamente via rollback. Caso bem sucedida, é realizado o commit confirmando a persistência dos dados.

## Fluxo da transação

1. A aplicação recebe os dados do usuário e do endereço;
2. Uma transação é iniciada: `START TRANSACTION`;
3. O usuário é inserido em `Users`;
4. O ID gerado é usado para criar o endereço;
5. Se ocorrer algum erro: `ROLLBACK`;
6. Se tudo funcionar corretamente: `COMMIT`.

## Modelagem do banco

O sistema utiliza duas tabelas relacionadas:

#### `Users`
| Campo | Tipo | Descrição |
|-------|------|------------|
| id | integer (PK) | Identificador único |
| name | varchar | Nome do usuário |
| age | integer | Idade do usuário |

#### `Address`
| Campo | Tipo | Descrição |
|-------|------|------------|
| id | integer (PK) | Identificador único |
| user_id | integer (FK) |	Referencia users.id |
| city | varchar | Nome da cidade |
| street |	varchar | Nome da rua |

### Relacionamento
   | Entidade | Tipo | Relacionamento | Descrição |
   | - | - | - | - |
   | `Users` | 1 | 1 -> N | Possui vários endereços |
   | `Address` | N | N -> 1 | Pertence a um único usuário |

## Como executar o projeto

1. Clone o repositório:

   Você pode clonar o projeto de duas formas:
   * Via HTTPS:
     ```cmd
     git clone https://github.com/dev-corporativos/transaction-acid.git
     ```
   * Via SSH:
     ```cmd
     git clone git@github.com:dev-corporativos/transaction-acid.git
     ```
     
2. Acesse a pasta do projeto
   ```cmd
   cd transaction-acid
   ```
3. Certifique-se de ter Docker + Docker Compose instalados.

4. Rode o contêiner na sua máquina:
   ```cmd
   docker compose up
   ```

   *Caso deseje rodar em segundo plano, insira a tag `-d`*:
   ```cmd
   docker compose up -d
   ```
## Como acessar o endpoint:

1. Você pode testar usando:

   - Insomnia
   - Postman
   - Thunder Client

2. A API ficará disponível em:
   ```cmd
   http://localhost:3000
   ```
3. Endpoint para cadastrar um usuário e seu endereço:
   ```http
   POST /create
   ```
4. Exemplo de JSON para ser enviado na requisição:
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
5. Resposta esperada, caso a transação seja feita (`COMMIT`):
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
6. Resposta esperada, caso a transação falhe (`ROLLBACK`):
   ```json
   {
     "error": "Erro na transação",
     "details": {}
   }
   ```

7. Caso deseje consultar os dados, dos usuários, que foram cadastrados. Utilize o endpoint:
   ```http
   GET /users
   ```

   *Retorna uma lista com todos os usuários.*
   
## Equipe de Desenvolvimento
| Nome | Matrícula |
| ----------------- | ----------- |
| [Robério Júnior](https://github.com/roberio-junior) | 20241038060010 |
| [Jardson Alan](https://github.com/jardsonalan) | 20241038060006 |
| [Ian Galvão](https://github.com/Barr0ca) | 20241038060011 |
| [José Lucas](https://github.com/uluscaz-ifrn) | 20241038060003 |
