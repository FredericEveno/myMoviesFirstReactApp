import React, {useState}  from 'react';
import './App.css';
import './components/Navbar.css';
import {Container, Row} from 'reactstrap';

import Movie from './components/Movie';
import Navbar from './components/Navbar';

function App(props) {

  // FILM DATA
  var moviesData = [
    {name:'Badboys 3', desc:'lorem ipsum', img:'badboy3.jpg', note:9, votes:5, views:222},
    {name:'Frozen', desc:'lorem ipsum', img:'frozen.jpg', note:4, votes:7, views:333},
    {name:'Jumanji', desc:'lorem ipsum', img:'jumanji.jpg', note:6, votes:2, views:444},
    {name:'Maleficent', desc:'lorem ipsum', img:'maleficent.jpg', note:7, votes:4, views:555},
    {name:'Once upon a time', desc:'lorem ipsum', img:'once_upon.jpg', note:3, votes:2, views:666},
    {name:'Starwars', desc:'lorem ipsum', img:'starwars.jpg', note:8, votes:10, views:777},
    {name:'Terminator', desc:'lorem ipsum', img:'terminator.jpg', note:5, votes:3, views:888}
  ];

  // #1 On déclare la variable d'état qui servira au compteur :
  const [moviesCount, setMoviesCount] = useState(0);
  // ... et à la whishlist
  const [moviesWishlist, setmoviesWishlist] = useState([]);

  // #2 On crée aussi la fonction souvenir qui servira à faire transiter les données et on l'envoie
  // à l'enfant en tant que prop : (l'étape #3 se déroulera dans l'enfant)
  var handleClickAddMovie = (countNocount, likedMovieName, likedMovieImg) => {
    console.log('app#CLICK!', {countNocount, likedMovieName, likedMovieImg});
    // Au retour de l'étape #3 dans l'enfant on traite l'info en fonction de l'état de countNocount
    if (countNocount === true) {
    // #4 On compte le nombre de fois où on rencontre un true ou un false en parcourant les Movies
      setMoviesCount(moviesCount+1);
      // Si le film est liké on pousse le nom dans le tableau moviesWishlist
      setmoviesWishlist([...moviesWishlist, {name:likedMovieName, img:likedMovieImg}]);

    } else { 
      if (countNocount === false && moviesCount>0) {
        setMoviesCount(moviesCount-1);
        // Si le film n'est plus liké on filtre le nom dans le tableau moviesWishlist
        setmoviesWishlist( moviesWishlist.filter( film => film.name !== likedMovieName ) );
      }
    }
  }
  console.log('moviesWishlist : ', moviesWishlist);

  // On envoie les props au composant Movie 
  var moviesList = [];
  for(var i=0; i<moviesData.length; i++) {
    moviesList.push(<Movie  movieName={moviesData[i].name} 
                            movieDesc={moviesData[i].desc} 
                            movieImg={moviesData[i].img} 
                            globalRating={moviesData[i].note} 
                            globalCountRating={moviesData[i].votes} 
                            globalViewsCount={moviesData[i].views}
                            handleClickAddMovieParent={handleClickAddMovie}
                    />)
  };

  return (
    <main className="App-header">
      <Container>
        <Row className="Navbar">
          {/* #5 On pense à envoyer le compteur de likes au composant Navbar */}
          <Navbar moviesCountParent={moviesCount}
                  moviesWishlistParent={moviesWishlist}
                  handleClickAddMovieParent={handleClickAddMovie}
          />
        </Row>
        <Row>
          {moviesList}
        </Row>
      </Container>
    </main>
  )
};

export default App;
