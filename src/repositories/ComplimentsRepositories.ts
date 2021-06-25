import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { User } from "../entities/User";

@EntityRepository(Compliment)
class ComplimentsRepositories extends Repository<Compliment> {}



export { ComplimentsRepositories }