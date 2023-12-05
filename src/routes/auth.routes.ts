import { Router } from "express";
import { listUser, login, register } from "../controllers/loginController";


const router = Router();

router.post("/login", login);
router.get("/listuser", listUser);
router.post("/register", register);


export default router;