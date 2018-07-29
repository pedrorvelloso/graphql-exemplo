import mongoose from 'mongoose'

const Schema = mongoose.Schema;

// Schema para Pessoa no Mongo
const pessoaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nome: String,
    idade: Number,
    cidade: String, 
})
export default mongoose.model('Pessoa', pessoaSchema)