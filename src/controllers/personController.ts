import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPerson = async (_req: Request, res: Response) => {
    try {
        const persons = await prisma.person.findMany();
        res.json(persons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const findPerson = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.params;
        const person = await prisma.person.findUnique({
            where: {
                id_person: Number(id),
            },
        });
        res.status(200).json(person);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const createPerson = async (_req: Request, res: Response) => {
    try {
        const { name, surname, email, phone, user } = _req.body;
        const person = await prisma.person.create({
            data: {
                name,
                surname,
                email,
                phone,
                users: {
                    connect: {
                        id_user: user,
                    }
                },
                status: {
                    connect: {
                        id_status: 1,
                    },
                },
            },
        });
        res.status(201).json(person);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

