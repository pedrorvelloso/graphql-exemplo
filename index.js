import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import typeDefs from './schema/typeDefs'
import resolvers from './schema/resolvers'

mongoose.connect('mongodb://localhost:27017/graphql-exemplo', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('📚  Mongo conectado')
});

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

const port = process.env.PORT || 4000

app.use(cors())

server.applyMiddleware({ app })

app.listen({ port }, () =>
    console.log(`🚀  Servindo em: http://localhost:${port}${server.graphqlPath}`)
)