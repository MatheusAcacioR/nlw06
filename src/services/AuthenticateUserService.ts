import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
    email: string 
    password: string 
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        // verificar se email existe
        const user = await usersRepositories.findOne({
            email
        })

        if(!user) {
            throw new Error("Email/Passoword incorrect")
        }
        // verificar se senha esta correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email/Passoword incorrect")
        }

        // gerar token
        const token = sign({
            email: user.email
        }, "5c995f63ab416be10abeaf9fe9e42891", {
            subject: user.id, expiresIn: "1d"
        })

        return token

    }
}

export { AuthenticateUserService }