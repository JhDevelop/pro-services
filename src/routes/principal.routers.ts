import { Router } from "express";
import { listUser, hello } from "../controllers/homeController";


const router = Router();

router.get("/home", listUser);

router.get("/hello", hello);

export default router;