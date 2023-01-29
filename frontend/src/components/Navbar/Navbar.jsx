import React, { useContext, useState } from 'react';
import { Badge, Button, Container, Nav } from 'react-bootstrap';
import NavbarBT from 'react-bootstrap/Navbar';
import ShoppingCartContext from '../../contexts/shopping-cart/ShoppingCartContext.jsx';
import UserContext from '../../contexts/users/UserContext.jsx';
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx';

import './navbar.css';

export default function Navbar() {
  const userCtx = useContext( UserContext )
  const shoppingCartCtx = useContext( ShoppingCartContext )

  const { logout, user } = userCtx
  const { products } = shoppingCartCtx

  const [ showShoppingCart, setShowShoppingCart ] = useState( false );

  const handleCloseShoppingCart = () => setShowShoppingCart( false );
  const handleShowShoppingCart = () => setShowShoppingCart( true );
  return (
    <>
      <NavbarBT bg='dark' variant='dark' expand="md">
        <Container>
          <NavbarBT.Brand href='#'>
            <img src='https://react-bootstrap.github.io/logo.svg' width="30" height="30" className="d-inline-block align-top"
              alt="React Bootstrap logo"></img>
          </NavbarBT.Brand>
          <NavbarBT.Toggle aria-controls="basic-navbar-nav"></NavbarBT.Toggle>
          <NavbarBT.Collapse id='basic-navbar-nav'>
            <Nav>
              <Button><Nav.Link href='/'>Home</Nav.Link></Button>

              {
                user?.email ? <>
                  <Button><Nav.Link href='/profile'>Perfil</Nav.Link></Button>
                  <Button onClick={ () => logout() } > <Nav.Link href='/'>Cerrar sesión</Nav.Link></Button>
                  <Button variant="primary" onClick={ handleShowShoppingCart }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg> <Badge bg="secondary">{ products.length > 0 ? products.length : '' }</Badge>
                  </Button>
                </> : <>
                  <Button><Nav.Link href='/auth/login'>Ingreso</Nav.Link></Button>
                  <Button><Nav.Link href='/auth/signup'>Registro</Nav.Link></Button>
                </>
              }
            </Nav>
          </NavbarBT.Collapse>
        </Container >
      </NavbarBT >
      <ShoppingCart showShoppingCart={ showShoppingCart } handleCloseShoppingCart={ handleCloseShoppingCart }>
      </ShoppingCart>

    </>
  );
}