# Apollo (GraphQL) + MongoDB

Exemplo simples de um servidor GraphQL (Apollo) utilizando MongoDB

## Pré-requisitos

- Node (6+)
- MongoDB

## Rodando o servidor

Instale as dependências do projeto e rode com os comandos no terminal:

```
npm i
npm start
```

Ocorrendo tudo corretamente você deverá ver o *output*:

```
🚀  Servindo em: http://localhost:4000/graphql
📚  Mongo conectado
```

Acesse http://localhost:4000/graphql para utilizar o Playground, lá é possível realizar queries e ver as documentações da API.

## Exemplos de Query

Começaremos utilizando uma *mutation* para inserir uma Pessoa

```
mutation{
  addPessoa(nome: "Pedro", idade: 21, cidade: "Brasília"){
    nome
  }
}
```

Ao executar essa *mutation* podemos retornar as propriedades da própria Pessoa inserida, nesse caso retornamos apenas o nome. O retorno deverá ser um JSON semelhante a este:

```javascript
{
  "data": {
    "addPessoa": {
      "nome": "Pedro"
    }
  }
}
```

Seguindo este exemplo insira outras Pessoas

A query seguinte irá listar todas as Pessoas (nome e idade):

```
{
  pessoas{
    nome
    idade
  }
}
```

O JSON esperado:

```javascript
{
  "data": {
    "pessoas": [
      {
        "nome": "Teste2",
        "idade": 22
      },
      {
        "nome": "Pedro",
        "idade": 21
      }
    ]
  }
}
```

Agora utilizando a *mutation* para inserir um Post (a *mutation* verifica a existência da Pessoa no banco):

```
mutation{
  addPost(titulo: "Teste", texto: "Texto Teste", autor: "Pedro")
}
```

```javascript
{
  "data": {
    "addPost": "Post feito com sucesso!"
  }
}
```

Agora utilizaremos a query que seleciona uma Pessoa específica pelo nome e juntamente selecionaremos as postagens da mesma:

```
{
  pessoas{
    nome
    idade
  }
}
```
```javascript
{
  "data": {
    "pessoa": {
      "nome": "Pedro",
      "idade": 21,
      "posts": [
        {
          "titulo": "Teste",
          "texto": "Texto Teste"
        }
      ]
    }
  }
}
```
Listar todos os posts:
```
{
    posts{
      titulo
      texto
      autor{
        nome
      }
    }
}
```
```javascript
{
  "data": {
    "posts": [
      {
        "titulo": "Um teste",
        "texto": "Haha!",
        "autor": {
          "nome": "Teste2"
        }
      },
      {
        "titulo": "Teste",
        "texto": "Texto Teste",
        "autor": {
          "nome": "Pedro"
        }
      }
    ]
  }
}
```

### Refs

- [GraphQL](https://graphql.org/)
- [Apollo](https://www.apollographql.com/) ([apollo-server-express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express))
- [Babel](https://babeljs.io/)
- [Mongoose](http://mongoosejs.com/)
- [Express](http://expressjs.com/)