import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = ()  => {
    localStorage.removeItem('token');
    localStorage.removeItem('isadmin');
    localStorage.removeItem('uid');
    window.location.reload()
  }


  return (
    <div>
      <Navbar color="" dark expand="md" className="bg-green">
        <Link to="/">
          <NavbarBrand><img src={`${process.env.PUBLIC_URL}/egbinlogo.png`} alt="Logo"  className="s_img"/> Leave Management System</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink><Link to="/">Home</Link></NavLink>
                </NavItem>
            {
              props.isadmin && 
              
              <>
              
                <NavItem>
                  <Link to="/leave-requests">
                    <NavLink>Leave Requests</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link to="/staff">
                    <NavLink>Manage Staff</NavLink>
                  </Link>
                </NavItem>
              </>
            } 
            <NavItem>
              <NavLink href="!#" onClick={handleLogout}>Logout</NavLink>
            </NavItem>
           
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
