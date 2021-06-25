// importando o modulo de rotas e o controller de usuario
import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'



// invocando o mosdulo de rotas
const router = Router()

// invocando os controllers
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplementController = new CreateComplimentController()

/* criando as rotas post passando como paramentro request o metodo handle 
   do controller que contem as informações nele */
router.post('/users', createUserController.handle)
router.post('/tags', ensureAdmin, createTagController.handle)
router.post('/session', authenticateUserController.handle)
router.post('/compliments', createComplementController.handle)

export { router }