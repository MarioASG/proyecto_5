import { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import UserContext from '../../contexts/users/UserContext.jsx'
import Catalogue from './Catalogue/Catalogue.jsx'

export default function Home() {
  const userCtx = useContext( UserContext )

  const { authStatus, verifyingToken } = userCtx

  const [ loading, setLoading ] = useState( true )

  useEffect( () => {

    if ( !authStatus ) {
      const verifyUser = async () => {
        await verifyingToken()
        setLoading( false )
      }
      verifyUser()
    }

  }, [ authStatus, verifyingToken ] )

  if ( loading ) return ( <><Spinner></Spinner></> )
  return (
    <Catalogue></Catalogue>
  )
}