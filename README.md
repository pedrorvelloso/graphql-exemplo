# Apollo (GraphQL) + MongoDB

Exemplo simples de um servidor GraphQL (Apollo) utilizando MongoDB

## Pré-requisitos

- Node (6+)
- MongoDB

## Rodando o servidor

Para iniciar o projeto utilize os seguintes comandos:

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

Agora utilizando a *mutation* para inserir um Post (a *mutation* verifica a existência do Id da Pessoa no banco):

```
mutation{
  addPost(titulo: "Teste", texto: "Texto Teste", autorId: "5b5bf280e78edf1ca7299827")
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
  pessoa(nome: "Pedro"){
    nome
    idade
    posts{
      titulo
      texto
    }
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

## Fazendo requisições para nosso servidor

Um servidor GraphQL recebe requisições HTTP, logo o metódo de realizar requisições é bem semelhante ao padrão REST. 

Podemos fazer a requisição tanto via GET, passando a *query string* "query" com a string da nossa query:

![](https://i.imgur.com/OnIOu4C.png)

Podemos também fazer a requisição via POST passando a query no corpo:

![](https://i.imgur.com/Jazc9pW.png)

O Playground também disponibiliza o cUrl para a requisição:

```
curl 'http://localhost:4000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"{pessoas{nome}}"}' --compressed
```

Entretanto, já existem algumas integrações para Frontend. O proprío Apollo tem a parte para cliente ([Apollo Client](https://www.apollographql.com/client)).

O Facebook também tem a integração chamada [Relay](https://facebook.github.io/relay/).

### Refs

- [GraphQL](https://graphql.org/)
- [Apollo](https://www.apollographql.com/) ([apollo-server-express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express))
- [Babel](https://babeljs.io/)
- [Mongoose](http://mongoosejs.com/)
- [Express](http://expressjs.com/)