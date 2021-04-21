import React, {useState} from 'react';
import './Movie.css';
import {Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup, Badge} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons'

function Movie(props) {

  // Déclaration des états
  const [likeMovie, setLikeMovie] = useState(false);
  const [watchMovie, setWatchMovie] = useState(false);
  const [countWatchMovie, setCountWatchMovie] = useState(props.globalViewsCount);
  const [myRatingMovie, setMyRatingMovie] = useState(0);

  // Gestion des clicks sur le like
  var likeClick = () => {
    setLikeMovie(!likeMovie);
    // #3 Au clic sur le coeur, on renvoie l'état du bouton au parent
    var onOff = !likeMovie; // On n'envoie pas directement likeMovie car cet état existe
                            // sur chaque élément movie, on ne veut compter que les clics
    props.handleClickAddMovieParent(onOff, props.movieName, props.movieImg);
  }
  var likeColor;
  if (likeMovie) {
    likeColor = {color: "#e74c3c"}
  } else {
    props.handleClickAddMovieParent(0);
    likeColor = {color: "#000000"}
  }

  // Gestion des clicks sur le watch
  var watchClick = () => {
    setWatchMovie(!watchMovie);
    if (watchMovie) {
      setCountWatchMovie(props.globalViewsCount);
    } else {
      setCountWatchMovie(props.globalViewsCount+1);
    }
  }
  var watchColor;
  if (watchMovie) {
    watchColor = {color: "#e74c3c"}
  } else {
    watchColor = {color: "#000000"}
  }

  // Gestion des clicks sur l'avis
  var myRatingMovieClickPlus = () => {
    if(myRatingMovie<10) {
      setMyRatingMovie(myRatingMovie+1);
    }
  }
  var myRatingMovieClickMoins = () => {
    if(myRatingMovie>0) {
      setMyRatingMovie(myRatingMovie-1);
    }
  }

  // Fonction d'affichage des étoiles
  var displayStars = (limit) => {
    var starsArray = [];
    var starColor;
    for (var i=0; i<10; i++) {
      if (i<limit) {
        starColor = {color: "#f1c40f"};
      } else {
        starColor = {color: "#000000"};
      }
      let starIndex = i+1;
      starsArray.push(<FontAwesomeIcon style={starColor} icon={faStar} onClick={ ()=>setMyRatingMovie(starIndex) } />);
    }
    return starsArray;
  }
  const myRatingStars = displayStars(myRatingMovie); // On calcule les étoiles pour mon vote
  const averageNote = Math.ceil(props.globalCountRating*props.globalRating + myRatingMovie)/(props.globalCountRating + 1);
  const averageStars = displayStars(averageNote); // On calcule les étoiles pour la moyenne

  // Movie app
  return (
    <Col xs="12" lg="6" xl="4">
      <Card className="Card">
        <CardImg top width="100%" src={`../img/${props.movieImg}`} alt={props.movieName}/>
        <CardBody>
          <CardText>Like
            <span> </span>
            <FontAwesomeIcon icon={faHeart} style={likeColor} onClick={ ()=>likeClick() } />
          </CardText>
          <CardText>Nombre de vues
            <span> </span>
            <FontAwesomeIcon icon={faVideo} style={watchColor} onClick={ ()=>watchClick() } />
            <span> </span>
            <Badge color="secondary">{countWatchMovie}</Badge>
          </CardText>
          <CardText>Mon avis
            <span> </span>
            {myRatingStars}
            <span> </span>
            <ButtonGroup size="sm">
              <Button color="secondary" onClick={ ()=>myRatingMovieClickMoins() } >-</Button>
              <Button color="secondary" onClick={ ()=>myRatingMovieClickPlus() } >+</Button>
            </ButtonGroup>
          </CardText>
          <CardText>Moyenne
            <span> </span>
            {averageStars}
            <span> </span>
            ({props.globalCountRating})
          </CardText>
          <CardTitle>{props.movieName}</CardTitle>
          <CardSubtitle>{props.movieDesc}</CardSubtitle>
        </CardBody>
      </Card>
    </Col>
  );
 };
 
 export default Movie;