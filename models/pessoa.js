import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema;

const pessoaSchema = new Schema({
    nome: String,
    idade: Number,
    cidade: String, 
})

module.exports = mongoose.model('Pessoa', pessoaSchema)