import './App.css';
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

  var moviesList = [];
  for(var i=0; i<moviesData.length; i++) {
    moviesList.push(<Movie  movieName={moviesData[i].name} 
                            movieDesc={moviesData[i].desc} 
                            movieImg={moviesData[i].img} 
                            globalRating={moviesData[i].note} 
                            globalCountRating={moviesData[i].votes} 
                            globalViewsCount={moviesData[i].views}
                    />)
  };
  console.log(moviesList);

  return (
    <main className="App-header">
      <Container>
        <Row className="Navbar">
          <Navbar/>
        </Row>
        <Row>
          {moviesList}
        </Row>
      </Container>
    </main>
  )
};

export default App;
