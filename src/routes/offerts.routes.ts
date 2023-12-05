import { Router } from "express";
import {createOffer, listOffers} from "../controllers/offertsController";


const offers_routes = Router();

offers_routes.post("/offert", createOffer);
offers_routes.get("/offert", listOffers);


export default offers_routes;