import React, {useState} from 'react';
import { Nav, NavItem, NavLink, Col, Button, Popover, PopoverHeader, 
        PopoverBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

function Navbar(props) {

  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  // On construit la whish list
  // var displayWhishlist = () => {
  //   var whishArray = [];
  //   for (var i=0; i<props.moviesNameParent.length; i++) {
  //     whishArray.push(<ListGroupItem>{props.moviesWishlistParent[i]}</ListGroupItem>);
  //   }
  //   return whishArray;
  // };
  // const whishList = displayWhishlist();

  // Même chose avec un map :
  var whishArray = props.moviesWishlistParent; // On récup la liste depuis App
  var whishList = whishArray.map( (film) => {
    // var whishlistItemClick = () => {
    //   props.handleClickAddMovieParent(false, e.name, e.img);
    // }
    return( <ListGroupItem className="whishListItem">
              <img src={`../img/${film.img}`} style={{width:"25%"}}></img>
              <span> </span>
              {film.name}
              <span> </span>
              <FontAwesomeIcon icon={faTimesCircle} onClick={ ()=>props.handleClickAddMovieParent(false, film.name, film.img) }/>
            </ListGroupItem> 
          );
  })

  return (
    <Col xs="12">
      <Nav pills>
        {/* Le logo */}
        <NavItem>
          <NavLink href="/"><img src='../img/logo.png'></img></NavLink>
        </NavItem>
        {/* Le texte */}
        <NavItem>
          <p className="vCenter">Last Releases</p>
        </NavItem>
        {/* Les films likés */}
        <NavItem>
        {/* On récupère le compteur de likes depuis l'App et on l'utilise pour l'afficher */}
        <NavLink>
          <Button id="Popover" type="button">{props.moviesCountParent} liked film(s)</Button>
          <Popover placement="bottom" isOpen={popoverOpen} target="Popover" toggle={toggle}>
            <PopoverHeader>Whishlist</PopoverHeader>
            <PopoverBody>
            <ListGroup>
              {whishList}
            </ListGroup>
            </PopoverBody>
          </Popover>
        </NavLink>
        </NavItem>
      </Nav>
    </Col>
  )};
 
export default Navbar;