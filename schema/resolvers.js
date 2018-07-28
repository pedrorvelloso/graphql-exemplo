import Pessoa from '../models/pessoa'
import Post from '../models/post'

const resolvers = {
    Pessoa: {
        posts: (root) => {
            return Post.find({ pessoaId: root.id })
        }
    },
    Post: {
        autor: (root) => {
            return Pessoa.findById(root.pessoaId)
        }
    },
    Query: {
        pessoas: () => {
            return Pessoa.find({})
        },
        pessoa: (root, args, context) => {
            return Pessoa.findOne({ nome: args.nome })
        },
        posts: () => {
            return Post.find({})
        },
    },
    Mutation: {
        addPessoa: (root, args) => {
            let pessoa = new Pessoa({
                nome: args.nome,
                idade: args.idade,
                cidade: args.cidade
            })
            return pessoa.save()
        },
        addPost: async (root, args) => {
            let pessoa = await Pessoa.findOne({ _id: args.autorId }, (err, p) => {
                return p
            }).catch(err => {
                return null
            })
            if (pessoa !== null) {
                let post = new Post({
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