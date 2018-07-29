import { gql } from 'apollo-server-express'

// typeDefs é a definição de tipos, nesse caso, utilizando as coleções do banco como base.
// Deverá utilizar o "gql" do Apollo
const typeDefs = gql`

    # Comentários em GraphQL utilizam o símbolo de hash (#)
    # A definição dos tipos é autoexplicativa olhando o código

    # Os comentários em 'resolvers.js' explicam como utilizar os dados do banco/API externa

    type Pessoa {
        id: ID
        nome: String
        idade: Int
        cidade: String
        posts: [Post]
    }

    type Post {
        id: ID
        titulo: String
        texto: String
        autor: Pessoa
    }

    type Query {
        pessoas: [Pessoa]
        pessoa(nome: String): Pessoa
        posts: [Post]
    }

    type Mutation {
        addPessoa(nome: String!, idade: Int!, cidade: String!): Pessoa
        addPost(titulo: String!, texto: String!, autorId: ID!): String
    }
`

export default typeDefs