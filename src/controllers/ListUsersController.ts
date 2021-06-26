import { Request, Response } from "express";
import { ListUsersServices } from "../services/ListUsersService";


class ListUsersController {
    async handle(request: Request, response: Response) {
        const listUsersService = new ListUsersServices()

        const users = await listUsersService.execute()

        return response.json(users)
    }
}

export { ListUsersController }