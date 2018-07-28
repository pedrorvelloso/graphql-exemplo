import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import Pessoa from './models/pessoa'
import Post from './models/post'

mongoose.connect('mongodb://localhost:27017/graphql-exemplo', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('📚  Mongo conectado!');
});

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
`;

const resolvers = {
    Pessoa: {
        posts(root, args) {
            return Post.find({ pessoaId: root.id })
        }
    },
    Post: {
        autor(root, args) {
            return Pessoa.findById(root.pessoaId)
        }
    },
    Query: {
        pessoas() {
            return Pessoa.find({})
        },
        pessoa(root, args, context) {
            return Pessoa.findOne({ nome: args.nome })
        },
        posts() {
            return Post.find({})
        },
    },
    Mutation: {
        addPessoa(root, args) {
            let pessoa = new Pessoa({
                nome: args.nome,
                idade: args.idade,
                cidade: args.cidade
            })
            return pessoa.save()
        },
        async addPost(root, args) {
            let pessoa = null
            await Pessoa.findOne({ nome: args.autor }, (err, p) => {
                if (p !== null) {
                    pessoa = p.id
                }
            })

            if (pessoa !== null) {
                let post = new Post({
                    titulo: args.titulo,
                    texto: args.texto,
                    pessoaId: pessoa
                })
                post.save()
                return "Post feito com sucesso!"
            }
            return "Erro ao postar"
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express()

const port = process.env.PORT || 4000

app.use(cors())

server.applyMiddleware({ app })

app.listen({ port }, () =>
    console.log(`\n🚀  Servindo em: http://localhost:${port}${server.graphqlPath}`)
)