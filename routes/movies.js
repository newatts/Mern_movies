const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.js');

router.get('/', async (req, res) => {
    try{
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
});



router.get('/:id', getMovie, (req, res) => {
    res.send(res.movie);                        //this specifies which property is returned int he browser. 
 //   res.send(res.movie.movieDirector);          //this specifies which property is returned int he browser. 
 //   res.send(res.movie.movieTitle);               //this specifies which property is returned int he browser. 
 //   res.send(res.movie.director.movieDate);          //this specifies which property is returned int he browser.
});

router.post('/', async (req, res) => {
    const movie = new Movie({
        movieTitle: req.body.movieTitle,
        movieDate: req.body.movieDate,
        movieDirector: req.body.movieDirector
    });
    try{
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    }catch(err){
        res.status(400).json({message: err.message });

    }
});

router.delete('/:id', getMovie, async (req, res) => {
    try{
        await res.movie.remove();
      //  res.status(204).send();
        res.json({message: 'movie deleted'});
      //  const movie = await Movie.findByIdAndDelete(req.params.id);
      //  res.status(200).json(movie);

    }catch(err){
        res.status(500).json({message: 'couold not ffind movie'});
    }
});

router.patch('/:id', getMovie, async (req, res) => {
    if(req.body.movieTitle !=null){
        res.movie.movieTitle = req.body.movieTitle;
    }
    if(req.body.movieDirector != null){
        res.movie.movieDirector = req.body.movieDirector;
    }
    try{
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie);
    }catch{
        res.status(400).json({message: 'movie not updated'});
    }

});


async function getMovie(req, res, next) {
    let movie;    // = await Movie.findById(req.params.id);
    try{
        movie = await Movie.findById(req.params.id);
        if(movie ==null) {
            return res.status(404).json({message: 'Cannot find movie'});
        }
    } catch(err) { 
        return res.status(500).json({message: 'the selected id is not found'}) ;  
    }
    res.movie = movie;
    next();
}

module.exports = router;