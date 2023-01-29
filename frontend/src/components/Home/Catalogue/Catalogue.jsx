import { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import "./catalogue.css"
import Product from './Product/Product.jsx'

export default function Catalogue() {
  const [ products, setProducts ] = useState( [] )
  const [ loadingData, setLoadingData ] = useState( true )

  useEffect( () => {
    const obtenerCatalogue = async () => {
      try {
        const response = await fetch( 'http://localhost:3001/products' )
        const products = await response.json()
        
        setProducts( products )
        setLoadingData( false )

      } catch ( error ) {
        console.error( error )
      }
    }
    try {
      obtenerCatalogue()
    } catch ( error ) {
      setLoadingData( false )
      console.error( error )
    }
  }, [] )
  return (
    <Container>
      <p>A continuación, podrá ver el listado de productos</p>
      {
        loadingData ? (
          <Spinner animation='border' role={ "status" }></Spinner>
        ) :
          <div className='list-products'>
            {
              products.length === 0 ?
                <h1>No hay productos</h1>
                : products.map( ( product, index ) => (
                  <Product product={ product } key={ index }></Product>
                ) )
            }
          </div>


      }
    </Container>
  )
}