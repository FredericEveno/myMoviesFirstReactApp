import React from 'react';
import { Nav, NavItem, NavLink, Col, Button, UncontrolledPopover, PopoverHeader, 
        PopoverBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

function Navbar(props) {

  // On construit la wish list
  var wishArray = props.moviesWishlistParent; // On récup la liste depuis App
  var wishList = wishArray.map( (film) => {
    // var wishlistItemClick = () => {
    //   props.handleClickAddMovieParent(false, e.name, e.img);
    // }
    return( <ListGroupItem className="wishListItem" key={film.toString()}>
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
          <Button id="PopoverLegacy" type="button">{props.moviesCountParent} liked film(s)</Button>
          <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy" >
            <PopoverHeader>wishlist</PopoverHeader>
            <PopoverBody>
            <ListGroup>
              {wishList}
            </ListGroup>
            </PopoverBody>
          </UncontrolledPopover>
        </NavLink>
        </NavItem>
      </Nav>
    </Col>
  )};
 
export default Navbar;