import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// GET /api/users with try/catch
export const listUser = async (_req: any, res: any) => {
    try {
        const users = await prisma.users.findMany();
        if (users.length === 0) {
            res.json("Error: No hay datos");
        } else {
            res.json(users);
        }
    } catch (error: any) {
        res.json("Error: " + error.message);
    }
}

export const hello =  async (_req: any, res: any) => {
    res.send("Hello World");
}

