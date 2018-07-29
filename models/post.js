import mongoose from 'mongoose'

const Schema = mongoose.Schema;

// Schema para Post no Mongo
const postSchema = new Schema({
    _id: Schema.Types.ObjectId,
    titulo: String,
    texto: String,
    // Referencia a Pessoa
    pessoaId: { type: Schema.Types.ObjectId, ref: 'Pessoa' }, 
})

export default mongoose.model('Post', postSchema)