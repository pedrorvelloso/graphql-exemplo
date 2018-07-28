import { gql } from 'apollo-server-express'

const typeDefs = gql`

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
        addPost(titulo: String!, texto: String!, autor: String!): String
    }
`

export default typeDefs