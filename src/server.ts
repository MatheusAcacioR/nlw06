import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import "express-async-errors"
import { router } from './routes'

// Chamando o express
const app = express()

// importando a conexao com o banco de dados
import './database'

// configurando a rota para receber requisiçoes em formato json
app.use(express.json())

// chamando as rotas de dentro do routes
app.use(router)

// Criando middware para tratativa de erro (O controller nao mais trata o erro e sim o servidor)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

// Abrindo a porta 3000 com o metodo listen
app.listen(3000, () => console.log("Server online!🚀"))