import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../contexts/users/UserContext.jsx';
import './login.css';

const Login = () => {
  const userCtx = useContext( UserContext )
  const history = useNavigate()
  const {
    loginUser,
    authStatus,
    verifyingToken
  } = userCtx

  const [ formValues, setFormValues ] = useState( {
    email: "",
    password: "",
  } )

  useEffect( () => {
    verifyingToken()

    if ( authStatus ) {
      history( "/profile" )
    }

  }, [ authStatus, verifyingToken, history ] )

  if ( authStatus ) return (
    <>
      <Spinner></Spinner>
    </> )

  async function handleSubmit( event ) {
    event.preventDefault()
    console.log( `🚀 ~ event`, formValues );
    return loginUser( formValues )

  }

  function handleFormChange( event ) {
    const { target } = event
    const { name, value } = target
    const newValues = { ...formValues, [ name ]: value }
    setFormValues( newValues )

  }

  return (
    <div>
      <h1>Ingreso</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor='email'>Correo</label>
        <input id='email' name='email' type="email" value={ formValues.email } onChange={ handleFormChange }></input>

        <label htmlFor='password'>Contraseña</label>
        <input type="password" id='password' name='password' value={ formValues.password } onChange={ handleFormChange }></input>

        <button type='submit'>Ingresar</button>
      </form>
    </div>
  )
}

export default Login