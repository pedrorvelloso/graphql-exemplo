import mongoose from 'mongoose'
import Pessoa from '../models/pessoa'
import Post from '../models/post'

// Resolvers são responsáveis por acessar o banco de dados/API externa e preencher nossos
// tipos com dados e suas devidas relações.

// É um objeto que deve referenciar ao tipos no 'typeDefs.js' utilizando-os como chave.
const resolvers = {
    // Para o tipo "Pessoa", temos a relação que tras a listagem de posts.
    // Cada resolver deve ficar dentro de um objeto e deve referencia a propriedade desejada.
    Pessoa: {
        // O parâmetro "root" referencia ao proprio tipo.
        // Comos os tipos são preenchidos de cima para baixo, teremos a informação do ID da Pessoa
        // antes de invocar essa função.
        posts: (root) => {
            return Post.find({ pessoaId: root.id })
        }
    },
    // A mesma ideia se aplica para os demais tipos.
    Post: {
        autor: (root) => {
            return Pessoa.findById(root.pessoaId)
        }
    },
    // "Query" vai ser reposnsável por disponibilizar as funções de busca definidas no 'typeDefs.js'.
    // Seria um equivalente ao verbo HTTP GET utilizado no padrão REST.
    Query: {
        // A query "pessoa" será responsável por trazer uma lista de pessoas.
        // Nessa caso só precisamos fazer uma consulta na coleção de pessoas no banco, os demais resolvers
        // para cada tipo resolverão as relações.
        pessoas: () => {
            return Pessoa.find({})
        },
        // Essa query iremos consultar uma pessoa pelo nome. Os argumentos definidos no 'typeDefs.js' ficarão no parâmetro
        // "args" (um objeto). Basta passa-lo na nossa consulta.
        pessoa: (root, args, context) => {
            return Pessoa.findOne({ nome: args.nome })
        },
        // A query de posts segue a mesma coisa da query de pessoas.
        posts: () => {
            return Post.find({})
        },
    },
    // As "mutations" são todas alterações/inclusão de dados que serão feitas.
    // É equivaletente aos verbos HTTP POST, PUT, PATCH, DELETE utilizados no padrão REST.
    Mutation: {
        // A mutation addPessoa irá basicamente pegar os arguementos e criar uma nova pessoa no banco. A mesma retornará
        // a Pessoa que acabou de ser salva.
        addPessoa: (root, args) => {
            let pessoa = new Pessoa({
                _id: new mongoose.Types.ObjectId(),
                nome: args.nome,
                idade: args.idade,
                cidade: args.cidade
            })
            return pessoa.save()
        },
        // addPost irá pegar os argumentos e criar um novo Post, além disso, irá verificar se o autorId existe na coleção de Pessoas.
        // Essa mutation ira funcionar de forma assíncrona pois a pesquisa realizada no Mongo é feita de forma assíncrona e precisamos esperar.
        // o resultado da busca para realizar os demais passos.
        // Nesse caso vamos retornar uma mensagem de erro ou sucesso (String).
        addPost: async (root, args) => {
            let pessoa = await Pessoa.findOne({ _id: args.autorId }, (err, p) => {
                return p
            }).catch(() => {
                return null
            })
            if (pessoa !== null) {
                let post = new Post({
                    _id: new mongoose.Types.ObjectId(),
                    titulo: args.titulo,
                    texto: args.texto,
                    pessoaId: pessoa.id
                })
                post.save()
                return "Post feito com sucesso!"
            }
            return "Erro ao postar"
        },
    },
}

export default resolvers