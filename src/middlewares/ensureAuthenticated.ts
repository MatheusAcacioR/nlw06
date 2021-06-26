import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayLoad {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // ! receber o token
    const authToken = request.headers.authorization
    
    // ! Validar se o token esta preenchido
    if (!authToken) {
        return response.status(401).end()
    }

    const [, token] = authToken.split(" ")
    
    try {
        // ! Validar se o token é valido 
        const { sub } = verify(token, "5c995f63ab416be10abeaf9fe9e42891") as IPayLoad

        // ! recuperar informações do usuario
        request.user_id = sub
        return next()
    }catch (err){
        return response.status(401).end()
    }
    
}