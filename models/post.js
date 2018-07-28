import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const postSchema = new Schema({
    titulo: String,
    texto: String,
    pessoaId: String, 
})

export default mongoose.model('Post', postSchema)