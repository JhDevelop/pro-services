import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login = async (_req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany();

        if (users.length === 0) {
            res.status(404).json({ error: "No hay datos" });
        } else {
            res.status(200).json("akjhaksdh712k3g67awo8713has834hkjsa");
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const listUser = async (_req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } catch (serror) {
        console.error("Error:", serror);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, status } = req.body;
        const statusId = parseInt(status, 10);
        const user = await prisma.users.create({
            data: {
                username,
                password,
                status: {
                    connect: {
                        id_status: statusId,
                    },
                },
            },
        });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await prisma.$disconnect();
    }
};