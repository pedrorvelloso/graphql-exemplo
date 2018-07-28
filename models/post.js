import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema;

const postSchema = new Schema({
    titulo: String,
    texto: String,
    pessoaId: String, 
})

module.exports = mongoose.model('Post', postSchema)