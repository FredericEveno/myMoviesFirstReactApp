import React, {useState, useEffect}  from 'react';
import './App.css';
import './components/Navbar.css';
import {Container, Row} from 'reactstrap';

import Movie from './components/Movie';
import Navbar from './components/Navbar';

function App(props) {
  console.log('#0');

  // Déclaration des états :
  const [moviesList, setMoviesList] = useState([]);
  const [moviesCount, setMoviesCount] = useState([]);
  const [moviesWishlist, setmoviesWishlist] = useState([]);
  
  //Init Movies data
  useEffect( () => {
    console.log('#1');
    // On sette les données des films
    async function settleMoviesData() {
      console.log('#2');
      // On fetche la route qui charge les films depuis le WS
      var fetchRawData = await fetch(`/new-movies`);
      var fetchData = await fetchRawData.json();

      setMoviesList(fetchData);

      // On fetche la route 'GET' de la wish list
      var fetchRawWishlist = await fetch('wishlist-movie')
      var fetchWishlist = await fetchRawWishlist.json()
      var wishlistFromDB = fetchWishlist.map((movie) => {
        return {name:movie.movieName, img:movie.movieImg}
      })

      setMoviesCount(wishlistFromDB.length)
      setmoviesWishlist(wishlistFromDB)
    }

    settleMoviesData();
    console.log('#3');
  },[] );

  //Set Movies moviesList
  // useEffect( () => {
  //   console.log("#4 App is loaded with :", moviesList);    
  // }, [moviesList]);

  // Destroy Movies data
  // useEffect( () => {
  //   return() => {console.log("Movies App is destroyed");};
  // },[] );
  
  // OLD FAKE MOVIES DATA
  // var moviesData = [
  //   {name:'Badboys 3', desc:'lorem ipsum', img:'badboy3.jpg', note:9, votes:5, views:222},
  //   {name:'Frozen', desc:'lorem ipsum', img:'frozen.jpg', note:4, votes:7, views:333},
  //   {name:'Jumanji', desc:'lorem ipsum', img:'jumanji.jpg', note:6, votes:2, views:444},
  //   {name:'Maleficent', desc:'lorem ipsum', img:'maleficent.jpg', note:7, votes:4, views:555},
  //   {name:'Once upon a time', desc:'lorem ipsum', img:'once_upon.jpg', note:3, votes:2, views:666},
  //   {name:'Starwars', desc:'lorem ipsum', img:'starwars.jpg', note:8, votes:10, views:777},
  //   {name:'Terminator', desc:'lorem ipsum', img:'terminator.jpg', note:5, votes:3, views:888}
  // ];

  // Déclaration des fonctions souvenir
  var handleClickAddMovie = async (countNocount, likedMovieName, likedMovieImg) => {
    if (countNocount === true) {
      setMoviesCount(moviesCount+1);
      // On pousse le film dans la wishlist
      setmoviesWishlist([...moviesWishlist, {name:likedMovieName, img:likedMovieImg}]);
      await fetch('wishlist-movie', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${likedMovieName}&img=${likedMovieImg}`
      })
    } else { 
      if (countNocount === false && moviesCount>0) {
        setMoviesCount(moviesCount-1);
        // On supprime le film de la wishlist
        setmoviesWishlist( moviesWishlist.filter( film => film.name !== likedMovieName ) );
        var result = await fetch(`wishlist-movie/${likedMovieName}`, {
          method: 'DELETE'
        })
      }}
    
  }
  // On envoie les props au composant Movie  > "moviesData" sera envoyée au JSX
  var moviesData = moviesList.map( movie => {
    var isInWishlist = false;
    var testIfItsInWishlist = moviesWishlist.find(film => film.name === movie.name);
    if (testIfItsInWishlist !== undefined) {
      isInWishlist = true;
    }
    // On traite la desc ...
    function truncateString(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + '...'
      } else {
        return str;
      }
    }
    // ... et les images
    var imgURL = "/img/default.jpg";
    if (movie.poster_path !== null) {
      imgURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    return(<Movie key={movie.id}
                  movieName={movie.title} 
                  movieDesc={truncateString(movie.overview, 80)} 
                  movieImg={imgURL} 
                  globalRating={movie.vote_average} 
                  globalCountRating={movie.vote_count} 
                  globalViewsCount={movie.popularity}
                  handleClickAddMovieParent={handleClickAddMovie}
                  isInWishlist={isInWishlist}
            />)
  })

  // Affichage de l'app (JSX)
  console.log('#5');
  return (
    <main className="App-header">
      <Container>
        <Row className="Navbar">
          {/* On envoie les props au composant Navbar  */}
          <Navbar moviesCountParent={moviesCount}
                  moviesWishlistParent={moviesWishlist}
                  handleClickAddMovieParent={handleClickAddMovie}
          />
        </Row>
        <Row>
        {moviesData}
        </Row>
      </Container>
    </main>
  )
};

export default App;
