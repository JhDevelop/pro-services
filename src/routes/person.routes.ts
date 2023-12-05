import { Router } from "express";
import { getPerson, findPerson, createPerson} from "../controllers/personController";


const person_routes = Router();

person_routes.get("/person", getPerson);
person_routes.get("/person/:id", findPerson);
person_routes.post("/person", createPerson);

export default person_routes;