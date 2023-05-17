![node-version](https://img.shields.io/badge/Node-v16.13.0-yellow)

## Objetivo 👩‍🎓
 O objetivo deste projeto foi simular um Blog, onde desenvolvi uma API e um banco de dados em Node.js, utilizando sequelize para fazer um CRUD,onde é possível
 criar usuários, fazer login, criar categorias de posts, criar posts, atualizá-los, deletá-los, buscá-los por id e por texto em seu título ou em seu conteúdo;

# Tecnologias utilizadas <a name="tecnologias"></a>
- [**Node JS**](https://nodejs.org/en/)
- [**Express**](https://expressjs.com/pt-br/)
- [**Https Status Code**](https://www.npmjs.com/package/http-status-codes)
- [**Thunder Client**](https://www.thunderclient.com/)
- [**Nodemon**](https://www.npmjs.com/package/nodemon)
- [**Linter**](https://eslint.org/docs/latest/)
- [**Sequelize**](https://sequelize.org/docs/v6/)
- [**Json Web Token**](https://jwt.io/introduction)
- [**Joi**](https://www.npmjs.com/package/joi)

<details>
  <summary><strong>Para Clonar e testar a aplicação</strong></summary>
  
### Será necessário ter instalado na sua máquina:
      Git
      Thunder Client
      MySQL
      Node v16.13.0
  
1. Clone o repositório

```
git clone git@github.com:georgia-rocha/Blogs-API.git
```

2. Entre na pasta do repositório que você acabou de clonar:

```
cd Blogs-API
```

<details>
  <summary><strong>:whale: Rodando Projeto no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker
 
  > Rode o serviço `node` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `Blogs-API`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it Blogs-API bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

  > Execute a aplicação com `npm start` ou `npm run dev`

  ---
  
  ## Sem Docker
  
  > Instale as dependências [**Caso existam**] com `npm install`
</details>


3. Para rodar a aplicação:

```
npm start
```

Em ambiente de desenvolvimento:
```
npm run dev
```
  
</details>

<details>
  <summary><strong>Descrevendo Aplicação</strong></summary>
  <details>
  <summary>Requisito 1 - Cria migrations para as tabelas users, categories, blog_posts, posts_categories</summary>
 - Foi criado as migrations para as tabelas respeitando a nomeclatura pedida no requisito e o diagrama de Entidade-Relacionamento e o formato das entidades;
    <br>
  - O teste fez uma conexão no banco de dados usando a configuração de teste do arquivo src/config/config.js, e foi posível validar que:
    <br>
    * É possível fazer um INSERT e um SELECT na tabela users;
    * É possível fazer um INSERT e um SELECT na tabela categories;
    * A partir de um INSERT em users, é possível fazer um INSERT e um SELECT na tabela blog_posts;
    <br>
    * A partir de INSERTs em users, categories e blog_posts, é possível fazer um INSERT e um SELECT na tabela posts_categories;  
  </details>
  
  <details>
    <summary>Requisito 2 - Cria model de User</summary>
 
  * É validado que existe o arquivo 'User.js';
  * É validado que o modelo possui o nome 'User';
  * É validado que o modelo possui a propriedade 'id';
  * É validado que o modelo possui a propriedade 'display_name';
  * É validado que o modelo possui a propriedade 'email';
  * É validado que o modelo possui a propriedade 'password';
  * É validado que o modelo possui a propriedade 'image';
  </details>
  
  <details>
    <summary>Requisito 3 - POST /login</summary>
    - O endpoint é acessível pela URL `/login`;
    - A requisição é feita no formato a seguir:
    ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```
    
  <strong>Os seguintes pontos foram avaliados:</strong>
    
  - Foi validado que não é possível fazer login sem todos os campos preenchidos:
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  - Foi validado que não é possível fazer login com um usuário que não existe:
    - Se a requisição receber um par de `email` e `password` errados/inexistentes, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Invalid fields"
    }
    ```
  
  - É validado que é possível fazer login com sucesso:
    - Se o login foi feito com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ```
    > :warning: O token anterior é fictício, seu token deve ser gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e não deve conter o atributo `password` em sua construção.
</details>
    
  <details>
    <summary>Requisito 4 - POST /user</summary>
    * O endpoint é acessível pela URL /user, onde é possível adicionar um novo usuário na tabela no banco de dados;
     * A requisição é feita no formato a seguir:
    
    ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    // a imagem não é obrigatória
  }
  ```
<strong>Pontos avaliados</strong>

  * É validado que não é possível cadastrar com o campo `displayName` menor que 8 caracteres;
    - Se a requisição não tiver o campo `displayName` devidamente preenchido com 8 caracteres ou mais, o resultado retornado é conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"displayName\" length must be at least 8 characters long"
    }
    ```
  
  * É validado que não é possível cadastrar com o campo `email` com formato inválido;
    - Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio>`, o resultado retornado é conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```

  * É validado que não é possível cadastrar com o campo `password` menor que 6 caracteres;
    - Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, o resultado retornado é conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```

  * É validado que não é possível cadastrar com um email já existente;
    - Se a requisição enviar o campo `email` com um email que já existe, o resultado retornado é conforme exibido abaixo, com um status http `409`:
    ```json
    {
      "message": "User already registered"
    }
    ```
  
  * É validado que é possível cadastrar um pessoa usuária com sucesso;
    - Se o user for criado com sucesso o resultado retornado é conforme exibido abaixo, com um status http `201`:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
      ```

  </details>
    
<details>
    <summary>Requisito 5 - GET /user/</summary>
 * O endpoint é acessível pela URL /user, onde é possível buscar todos os usuários na tabela no banco de dados;
 
  * É validado que é possível listar todos os usuários;
    - Ao listar usuários com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },

      /* ... */
    ]
    ```
  </details>
    
 <details>
    <summary>Requisito 6 - GET /user/:id</summary>
- O endpoint é acessível através do URL `/user/:id`;
- O endpoint é capaz de trazer o `user` baseado no `id` do banco de dados se ele existir;

<strong>Pontos avaliados</strong>

   * É validado que é possível listar um usuário específico com sucesso;
    - Ao listar um usuário com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    }
    ```

  * É validado que não é possível listar um usuário inexistente;
    - Se o usuário for inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "User does not exist"
    }
    ```
  </details>

 <details>
    <summary>Requisito 7 - Cria model de Category</summary>
       
<strong>Pontos avaliados</strong>

  * É validado que existe o arquivo 'Category.js';
  * É validado que o modelo possui o nome 'Category';
  * É validado que o modelo possui a propriedade 'id';
  * É validado que o modelo possui a propriedade 'name';

  </details>
  
  <details>
    <summary>Requisito 8 - POST /categories</summary>
     
     - O endpoint é acessível através do URL `/categories`;
- O endpoint é capaz de adicionar uma nova categoria na tabela no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "name": "Typescript"
  }
  ```
  
     <strong>Pontos avaliados</strong>

  * É validado que não é possível cadastrar uma categoria sem o campo `name`;
    - Se a requisição não tiver o campo `name` devidamente preenchidos(não pode haver campo em branco), o resultado retornado é conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"name\" is required"
    }
    ```

  * É validado que é possível cadastrar uma categoria com sucesso;
    - Se a categoria for criada com sucesso o resultado retornado é conforme exibido abaixo, com um status http `201`:
    ```json
    {
      "id": 3,
      "name": "Typescript"
    }
    ```
  </details>
    
<details>
    <summary>Requisito 9 - GET /categories</summary>
      
- O endpoint é acessível através do URL `/categories`;
- O endpoint é capaz de trazer todas categorias do banco de dados;

<strong>Os seguintes pontos serão avaliados</strong>

  * É validado que é possível listar todas as categoria com sucesso;
    - Ao listar categorias com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "name": "Inovação"
      },
      {
          "id": 2,
          "name": "Escola"
      },

      /* ... */
    ]
    ```
  </details>
    
 <details>
    <summary>Requisito 10 - Cria model de BlogPost</summary>
     <strong>Pontos avaliados</strong>

  * É validado que existe o arquivo 'BlogPost.js';
  * É validado que o modelo possui o nome 'BlogPost';
  * É validado que o modelo possui a propriedade 'id';
  * É validado que o modelo possui a propriedade 'title';
  * É validado que o modelo possui a propriedade 'content';
  * É validado que o modelo possui a propriedade 'user_id'];
  * É validado que o modelo possui a propriedade 'published';
  * É validado que o modelo possui a propriedade 'updated'];
  * É validado que o modelo em 'BlogPost.js', define a associação 'belongsTo', com a entidade de nome 'User';

  * É validado que o modelo em 'User.js', define a associação 'hasMany', com a entidade de nome 'BlogPost';
  </details>
    
<details>
    <summary>Requisito 11 - Cria model de PostCategory</summary>
       
     <strong>Os seguintes pontos serão avaliados</strong>

  * É validado que existe o arquivo 'PostCategory.js';

  * É validado que o modelo possui o nome 'PostCategory';

  * É validado que o modelo possui a propriedade 'post_id';

  * É validado que o modelo possui a propriedade 'category_id';

  * É validado que o modelo em 'PostCategory.js', através do(s) modelos(s) de nome(s) 'Category; BlogPost', define a associação 'belongsToMany' respectivamente, com o(s) modelo(s) de nome(s) 'BlogPost, Category']**
  </details>
    
<details>
    <summary>Requisito 12 - POST /post</summary>
     
- O endpoint é acessível através do URL `/post`;
- O endpoint é capaz de adicionar um novo blog post e vinculá-lo às categorias em suas tabelas no banco de dados;
- O corpo da requisição segue o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```
  
<strong>Pontos avaliados</strong>
       
  * É validado que não é possível cadastrar sem todos os campos preenchidos;
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado é conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * É validado que não é possível cadastrar um blog_post com uma `categoryIds` inexistente;
    - Se a requisição **não** tiver o campo `categoryIds` devidamente preenchido com um array com **todas** as categorias existentes, o resultado retornado é conforme exibido abaixo, com um status http `400``:
    ```json
    {
      "message": "one or more \"categoryIds\" not found"
    }
    ```

  * É validado que é possível cadastrar um blog_post com sucesso;
  - Se o blog post for criado com sucesso o resultado retornado é conforme exibido abaixo, com um status http `201`:
  ```json
  {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "updated": "2022-05-18T18:00:01.196Z",
    "published": "2022-05-18T18:00:01.196Z"
  }
  ```
</details>

    <details>
    <summary>Requisito 13 - GET /post/</summary>
       - O endpoint é acessível através do URL `/post`;
- O endpoint é capaz de trazer todos os blogs post, user dono dele e as categorias do banco de dados;

       <strong>Pontos avaliados</strong>

  * É validado que é possível listar blogpost com sucesso;
    - Ao listar posts com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 1,
            "name": "Inovação"
          }
        ]
      },
      
      /* ... */
    ]
    ```
  </details>
    
     <details>
    <summary>Requisito 14 - GET /post/:id</summary>
       
       - O endpoint é acessível através do URL `/post/:id`;
- O endpoint é capaz de trazer o blog post baseado no `id` do banco de dados se ele existir;

<strong>Pontos avaliados</strong>

  * É validado que é possível listar um blogpost com sucesso;
    - Ao listar um post com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
          {
              "id": 1,
              "name": "Inovação"
          }
      ]
    }
    ```

  * É validado que não é possível listar um blogpost inexistente;
    - Se o post for inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```
  </details>
    
     <details>
    <summary>Requisito 15 - PUT /post/:id</summary>
       - O endpoint é acessível através do URL `/post/:id`;
- O endpoint é capaz de alterar um post do banco de dados, se ele existir;
- A aplicação só permite a alteração de um blog post caso a pessoa seja dona dele;
- A aplicação não permite a alteração das categorias do post, somente os atributos `title` e `content` podem ser alterados;
- O corpo da requisição segue o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```
       
<strong>Pontos avaliados</strong>

  * É validado que não é possível editar um blogpost com outro usuário;
    - Somente o user que criou o blog post poderá editá-lo, o resultado retornado é conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * É validado que não é possível editar sem todos os campos preenchidos;
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado é conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * É validado que é possível editar um blogpost com sucesso;
    - Se o blog post for alterado com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 3,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2022-05-18T18:00:01.000Z",
      "updated": "2022-05-18T18:07:32.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        },
        {
          "id": 2,
          "name": "Escola"
        }
      ]
    }
    ```
  </details>
    
    <details>
      <summary>Requisito 16 - DELETE /post/:id</summary>
      - O endpoint é acessível através do URL `/post/:id`;
- O endpoint é capaz de deletar um blog post baseado no `id` do banco de dados se ele existir;
- A aplicação só permite a deleção de um blog post caso a pessoa seja dona dele;

<strong>Os seguintes pontos serão avaliados</strong>

  * É validado que não é possível deletar um blogpost com outro usuário;
    - Somente o user que criou o blog post poderá deletá-lo, o resultado retornado é conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * É validado que é possível deletar um blogpost com sucesso;
    - Se o blog post for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:

  * É validado que não é possível deletar um blogpost inexistente;
    - Se o post for inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```
    </details>
    
    <details>
      <summary>Requisito 17 - DELETE /user/me </summary>
      - O endpoint é acessível através do URL `/user/me`;
- O endpoint é capaz de deletar você do banco de dados, baseado no `id` que esta dentro do seu `token`;
- A aplicação é capaz de utilizar o token de autenticação nos headers, para saber o user logado correspondente á ser apagado;

      <strong>Pontos avaliados</strong>

  * É validado que é possível excluir meu usuário com sucesso;
    - Se o user for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:
    </details>

    <details>
      <summary>Requisito 18 - /GET /post/search</summary>
      - O endpoint é acessível através do URL `/post/search`;
- O endpoint é capaz de trazer os blogs post baseados no `q` do banco de dados, se ele existir;
- A aplicação é capaz de retornar um array de blogs post que contenham em seu título ou conteúdo o termo passado na URL;
-A aplicação é capaz de retornar um array vázio caso nenhum blog post satisfaça a busca;
- O query params da requisição segue o formato abaixo:
  ```js
    http://localhost:PORT/post/search?q=vamos
  ```

<strong>Pontos avaliados</strong>

  * É validado que é possível buscar um blogpost pelo `title`;
    - Se a buscar for pelo `title` o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
    // GET /post/search?q=Vamos que vamos

    [
      {
        "id": 2,
        "title": "Vamos que vamos",
        "content": "Foguete não tem ré",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 2,
            "name": "Escola"
          }
        ]
      }
    ]
    ```

  * É validado que é possível buscar um blogpost pelo `content`;
    - Se a buscar for pelo `content` o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=Foguete não tem ré

      [
        {
          "id": 2,
          "title": "Vamos que vamos",
          "content": "Foguete não tem ré",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 2,
              "name": "Escola"
            }
          ]
        }
      ]
    ```

  * É validado se é possível buscar todos os blogpost quando passa a busca vazia;
    - Se a buscar for vazia o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=

      [
        {
          "id": 1,
          "title": "Post do Ano",
          "content": "Melhor post do ano",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 1,
              "name": "Inovação"
            }
          ]
        },
        
        /* ... */
      ]
    ```

  * É validado que é possível buscar um blogpost inexistente e retornar array vazio;
    - Se a buscar um post inexistente o resultado retornado é conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=BATATA

      []
    ```
    </details>
    
    <details>
    <summary><strong>Validando token</strong></summary>
 * Alguns requisitos precisaram da validação do token, para que fosse possível consumir o endpoint
<strong>Pontos avaliados</strong>

  * É validado que não é possível fazer uma operação sem o token na requisição;
    - Se o token for inexistente o resultado retornado é conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```

  * É validado que não é possível fazer uma operação com o token inválido;
    - Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Expired or invalid token"
    }
    ```

  </details>
  
  </details>

## Requisitos Obrigatórios 100% ✔️
O projeto foi desenvolvido seguindo requisitos pré-estabelecidos:

- [x] 1. Crie migrations para as tabelas users, categories, blog_posts, posts_categories;
- [x] 2. Crie o modelo User em src/models/User.js com as propriedades corretas;
- [x] 3. Sua aplicação deve ter o endpoint POST /login;
- [x] 4. Sua aplicação deve ter o endpoint POST /user;
- [x] 5. Sua aplicação deve ter o endpoint GET /user;
- [x] 6. Sua aplicação deve ter o endpoint GET /user/:id;
- [x] 7. Crie o modelo Category em src/models/Category.js com as propriedades corretas;
- [x] 8. Sua aplicação deve ter o endpoint POST /categories;
- [x] 9. Sua aplicação deve ter o endpoint GET /categories;
- [x] 10. Crie o modelo BlogPost em src/models/BlogPost.js com as propriedades e associações corretas;
- [x] 11. Crie o modelo PostCategory em src/models/PostCategory.js com as propriedades e associações corretas;
- [x] 12. Sua aplicação deve ter o endpoint POST /post;
- [x] 13. Sua aplicação deve ter o endpoint GET /post;
- [x] 14. Sua aplicação deve ter o endpoint GET /post/:id;
- [x] 15. Sua aplicação deve ter o endpoint PUT /post/:id;

## Requisitos bônus

- [x] 16. Sua aplicação deve ter o endpoint DELETE /post/:id;
- [x] 17. Sua aplicação deve ter o endpoint DELETE /user/me;
- [x] 18. Sua aplicação deve ter o endpoint GET /post/search?q=:searchTerm;
