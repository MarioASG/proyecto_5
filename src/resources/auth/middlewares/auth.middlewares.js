//Middleware para verificar tokens
import jwt from 'jsonwebtoken'
const {TOKEN_SECRET} = environment

export const verifyToken = (req, res, next)=>{
//Se extrae el token del header
    const authHeader = req.headers['authorization']
    const token = authHeader&&authHeader.split('')[1]
//Si existe, se extrae la información del token
    if(!token)
    return res.status(401).json({
        status: 'FAILED',
        error: 'No se encuentra el token'
    })
    try{
//Se incorpopra la request en la variable user y luego se retorna
        const payload = jwt.verify(token, TOKEN_SECRET)
        req.user = payload
        next()
    } catch(error){
        if (error instanceof jwt.TokenExpiredError){
            res.status(401).json({
                status: 'FAILED',
                error: 'Expiró el token'
            })
        }
        else if (error instanceof jwt.JsonWebTokenError){
            req.status(401).json({
                status: 'FAILED',
                error: 'El token no es válido'
            })
        }
    }

}

export const verifyIfIsAdmin = (req, res, next)=>{
    const user = req.user
    if(user.role !== 'ADMIN'){
        res.status(403).json({
            status:'FAILED',
            error: 'No posee los permisos'
        })
    }
    next()
}