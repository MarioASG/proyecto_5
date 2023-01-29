import { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import ShoppingCartContext from '../../../../contexts/shopping-cart/ShoppingCartContext.jsx'

const Product = ( props ) => {
  const { product } = props
  const shoppingCartCtx = useContext( ShoppingCartContext )
  const { addProduct } = shoppingCartCtx

  return (
    <Card style={ { 
      width: '15rem',
      opacity: 0.8
        } } key={ product._id }>
      <Card.Img variant="top" style={ { height: '15rem', opacity: 10} }src={ product.image } />
      <Card.Body>
        <Card.Title>{ product.name }</Card.Title>
        <Card.Text>
          { product.price }
        </Card.Text>
        <Button variant="primary" onClick={ () => {
          addProduct( product )
        }
        } >Agregar al carrito</Button>
      </Card.Body>
    </Card> )
}
export default Product