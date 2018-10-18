import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import typeDefs from './schema/typeDefs'
import resolvers from './schema/resolvers'

// Conexão com MongoDB (Mongoose)
// No exemplo o Mongoose criara a db e eventuais coleções 
// Troque a string se for seu caso
mongoose.connect('mongodb://0.0.0.0:27017/graphql-exemplo', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('📚  Mongo conectado')
});

// Declarando ApolloServer
// O schema é definido pela declaração de tipo e seus resolvers
// typeDefs -> definição de tipos. Todos os "objetos" de consulta são declarados junto
// com seus relacionamentos
// resolvers -> responsável por ir até uma fonte de dados (banco de dados/REST api) e popular
// o resultado das queries
const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
const port = process.env.PORT || 4000

// Habilitando CORS no servidor
app.use(cors())

server.applyMiddleware({ app })

app.listen({ port }, () =>
    console.log(`🚀  Servindo em: http://localhost:${port}${server.graphqlPath}`)
)