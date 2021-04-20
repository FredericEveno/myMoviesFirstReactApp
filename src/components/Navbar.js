import React from 'react';
import './Navbar.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Col} from 'reactstrap';

function Navbar(props) {
  return (
    <Col xs="12">
      <Nav pills>
        {/* Le logo */}
        <NavItem>
          <NavLink className={"App-link"} href="/"><img src='../img/logo.png'></img></NavLink>
        </NavItem>
        {/* Le texte */}
        <NavItem>
          <NavLink>Last Releases</NavLink>
        </NavItem>
        {/* Les films likés */}
        <NavItem>
        <NavLink>3 films</NavLink>
        </NavItem>
      </Nav>
    </Col>
  )};
 
export default Navbar;