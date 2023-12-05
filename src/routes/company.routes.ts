import { Router } from "express";
import { registerCompany, listCompanies, findCompany, deleteCompany} from "../controllers/companyController";


const company_routes = Router();

company_routes.post("/company", registerCompany);
company_routes.get("/company", listCompanies);
company_routes.get("/company/:id", findCompany);
company_routes.delete("/company", deleteCompany);


export default company_routes;