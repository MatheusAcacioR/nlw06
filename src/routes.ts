// importando o modulo de rotas e o controller de usuario
import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController'
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUsersController } from './controllers/ListUsersController'



// invocando o mosdulo de rotas
const router = Router()

// invocando os controllers
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplementController = new CreateComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

/* criando as rotas post passando como paramentro request o metodo handle 
   do controller que contem as informações nele */
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post('/users', createUserController.handle)
router.post('/session', authenticateUserController.handle)
router.post('/compliments', ensureAuthenticated, createComplementController.handle)

router.get('/users', ensureAuthenticated, listUsersController.handle)
router.get('/tags', ensureAuthenticated, listTagsController.handle)
router.get('/user/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle)
router.get('/user/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle)

export { router }