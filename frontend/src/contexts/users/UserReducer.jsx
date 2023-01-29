
const reducers = ( globalState, action ) => {

  switch ( action.type ) {
    case 'LOGIN_EXITOSO':
      localStorage.setItem( "token", action.payload.token )

      return {
        ...globalState,
        authStatus: true,
      }

    case "REGISTRO_EXITOSO":

      localStorage.setItem( "token", action.payload.token )

      return {
        ...globalState,
        authStatus: true,
      }

    case "OBTENER_USUARIO":

      return {
        ...globalState,
        authStatus: true,
        user: action.payload
      }


    case "CERRAR_SESION":
      localStorage.removeItem( 'token' )
      localStorage.removeItem( 'shoppingCart' )

      return {
        ...globalState,
        user: null,
        authStatus: false,
        loading: false
      }

    default:
      return globalState

  }

}

export default reducers
