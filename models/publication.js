const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
    author: {
        type: String,
        required: [true, 'O nome do autor é obrigatório.'],
        minLength: [3, 'O nome do autor deve ter pelo menos 3 caracteres.'],
        maxLength: [90, 'O nome do autor deve ter no máximo 90 caracteres'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'O título da publicação é obrigatório'],
        minLength: [5, 'O título da publicação deve ter pelo menos 5 caracteres.'],
        maxLength: [120, 'O título da publicação deve ter no máximo 120 caracteres'],
        trim: true
    },
    text: {
        type: String,
        required: [true, 'O texto da publicação é obrigatório'],
        minLength: [1, 'O texto da publicação deve ter pelo menos 1 caractere.'],
        maxLength: [255, 'O texto da publicação deve ter no máximo 1255 caracteres.'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Você deve colocar uma imagem na sua publicação!'],
        trim: true
    },
}, { timestamps: true } );

module.exports = mongoose.model('Publication', publicationSchema);