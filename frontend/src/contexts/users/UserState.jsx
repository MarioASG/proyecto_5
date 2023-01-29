
import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'

const UserState = ( props ) => {

  const initialState = {
    user: {
      id: null,
      fullName: null,
      email: null
    },
    authStatus: false,
    loading: true
  }

  const [ globalState, dispatch ] = useReducer( UserReducer, initialState )

  const registerUser = async ( dataForm ) => {

    try {
      const fetchResponse = await fetch( 'http://localhost:3001/auth/signup', { method: 'POST', headers: { "Content-type": 'application/json', "Accept": 'application/json' }, body: JSON.stringify( dataForm ) } )
      const response = await fetchResponse.json()
      if ( !fetchResponse.ok ) {
        throw new Error( response.details )
      }
      dispatch( {
        type: "REGISTRO_EXITOSO",
        payload: response
      } )

    } catch ( error ) {
      console.error( error )

    }
  }

  const loginUser = async ( dataForm ) => {
    try {
      const fetchResponse = await fetch( 'http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify( dataForm )
      } )

      const response = await fetchResponse.json()
      if ( !fetchResponse.ok ) {
        throw new Error( response.details )
      }
      dispatch( {
        type: "LOGIN_EXITOSO",
        payload: response
      } )

    } catch ( error ) {
      console.error( error )
    }
  }

  const verifyingToken = async () => {

    const token = localStorage.getItem( 'token' )
    if ( !token ) {
      return null
    }
    try {

      const fetchResponse = await fetch( "http://localhost:3001/users/profile", {
        method: 'GET', headers: {
          "Authorization": `Bearer ${ token }`,
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      } )
      const response = await fetchResponse.json()
      if ( !fetchResponse.ok ) {
        throw new Error( response.error )
      }
      dispatch( {
        type: "OBTENER_USUARIO",
        payload: response
      } )

    } catch ( error ) {
      console.error( error )
      dispatch( {
        type: "CERRAR_SESION"
      } )
    }
  }

  const logout = () => {
    dispatch( {
      type: "CERRAR_SESION"
    } )
  }

  return (
    <UserContext.Provider value={ {
      user: globalState.user,
      authStatus: globalState.authStatus,
      loading: globalState.loading,
      registerUser,
      loginUser,
      verifyingToken,
      logout
    } }>

      { props.children }

    </UserContext.Provider>
  )


}


export default UserState
