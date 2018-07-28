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
}

export default resolvers