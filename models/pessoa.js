import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const pessoaSchema = new Schema({
    nome: String,
    idade: Number,
    cidade: String, 
})
export default mongoose.model('Pessoa', pessoaSchema)