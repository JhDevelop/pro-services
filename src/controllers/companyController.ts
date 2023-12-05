import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerCompany = async (_req: Request, res: Response) => {
    const { name, usr } = _req.body;

    try {

        //Verificar que user existe
        const user = await prisma.users.findUnique({
            where: {
                id_user: usr,
            },
        });


        const company = await prisma.company.create({
            data: {
                name,
                users: {
                    connect: {
                        id_user: user?.id_user,
                    },
                },
                status: {
                    connect: {
                        id_status: 1,
                    },
                }
            },
        });
        res.status(201).json({ message: 'Compania creada exitosamente', data: company });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await prisma.$disconnect();
    }
};

export const listCompanies = async (_req: Request, res: Response) => {
    try {
        const companies = await prisma.company.findMany();
        res.status(200).json(companies);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const updateCompany = async (_req: Request, res: Response) => {
    try {
        const { id, name } = _req.body;
        const company = await prisma.company.update({
            where: {
                id_company: id,
            },
            data: {
                name,
            },
        });
        res.status(200).json(company);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const deleteCompany = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.body;
        const company = await prisma.company.update({
            where: {
                id_company: id,
            },
            data: {
                status: {
                    connect: {
                        id_status: 2,
                    },
                }
            },
        });
        res.status(200).json(company);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}


export const findCompany = async (_req: Request, res: Response) => {
    try {
        const id = _req.body;
        const id_company = parseInt(id, 10);
        const company = await prisma.company.findUnique({
            where: {
                id_company: id_company,
            },
        });
        res.status(200).json(company);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}