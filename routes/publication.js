const express = require('express');
const router = express.Router();

const Publication = require('../models/publication');

router.get('/', (req, res, next) => {

    Publication.find()
    .then( publications => {

        if(!publications){
            const error = new Error('Nenhuma publicação encontrada!')
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Publicações recuperadas com sucesso!",
            publications: publications
        });
    })
    .catch( err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
});

router.get('/publicacoes/:pubId', (req, res, next) => {
    const pubId = req.params.pubId;

    Publication.findById(pubId)
    .then( publication => {
        if(!publication){
            const error = new Error('Nenhuma publicação encontrada!');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Filme encontrado com sucesso!",
            publication: publication
        })
    })
    .catch( err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
    

})

router.post('/nova-publicacao', (req, res, next) => {

    const author = req.body.author
    const title = req.body.title;
    const text = req.body.text;
    const image = req.body.image;

    const newPublication = new Publication({ author: author, title: title, text: text, image: image });

    return  newPublication.save()
    .then( result => {
        res.status(201).json({
            message: "Publicação criada com sucesso!",
            newPublication: newPublication
        })
    })
    .catch( err => {
        err.statusCode = 422;
        next(err);
    })
    

})

router.put('/publicacao/:pubId', (req, res, next) => {
    const pubId = req.params.pubId

    const updatedAuthor = req.body.author // Mais tarde o 'author' será setado por autenticação
    const updatedTitle = req.body.title;
    const updatedText = req.body.text;
    const updatedImage = req.body.image

    Publication.findByIdAndUpdate(pubId)
    .then( publication => {
        if(!publication){
            const error = new Error('Publicação não encontrada!');
            error.statusCode = 404;
            throw error;
        }

        publication.author = updatedAuthor;
        publication.title = updatedTitle;
        publication.text = updatedText;
        publication.image = updatedImage;

        return publication.save()
        .then( result => {
        res.status(200).json({
                message: "Publicação atualizada com sucesso",
                publication: result
            })
        })
    })
    .catch( err => {
        if(!err.statusCode){
            err.statusCode = 422;
        }
        next(err)
    })
})

router.delete('/publicacao/:pubId', (req, res, next) => {
    const pubId = req.params.pubId;

    Publication.findByIdAndDelete(pubId)
    .then( publication => {
        if(!publication){
            const error = new Error('Publicação não encontrada!');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Publicação excluida com sucesso!",
            publication: publication
        })

    })
    .catch( err => {
        if(!err.statusCode){
            err.statusCode = 422;
        }
        next(err)
    })

})

module.exports = router;
