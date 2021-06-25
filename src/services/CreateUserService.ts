import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from 'bcryptjs'

interface IUserRequest{
    name: string
    email: string
    admin?: boolean
    password: string
}

class CreateUserService {
    
    async execute({ name, email, admin = false, password } : IUserRequest) {
        const UsersReposity = getCustomRepository(UsersRepositories)

        // * Verificando se o email esta preenchido
        if (!email) {
            throw new Error ("Email incorrect")
        }

        // * Tratando se ja existe um usuario com esse email
        const userAlreadyExists = await UsersReposity.findOne({
            email,
        })

        if (userAlreadyExists) {
            throw new Error("User already exists")
            
        }

        const passwordHash = await hash(password, 8)

        // * Criando um novo usuario com as determinadas informações
        const user = UsersReposity.create({
            name,
            email,
            admin,
            password: passwordHash,
        })

        // * Salvando esse usuario que foi criado
        await UsersReposity.save(user)

        return user
    }
}

export { CreateUserService }