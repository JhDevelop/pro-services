import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listPersonCvs = async (_req: Request, res: Response) => {
    try {
        const personCvs = await prisma.person_cv.findMany();
        res.json(personCvs);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los person_cv' });
    }
};

export const getPersonCv = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const idInt: number = parseInt(id, 10);

    try {
        const personCv = await prisma.person_cv.findUnique({
            where: { id_person_cv: idInt },
        });

        if (!personCv) {
            return res.status(404).json({ error: 'Person_cv no encontrado' });
        }

        return res.json(personCv);
    } catch (error: any) {
        console.error('Error al obtener el person_cv:', error);
        return res.status(500).json({ error: 'Error al obtener el person_cv' });
    }
};

export const updatePersonCv = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const { estado } = _req.body;
    try {
        const updatedPersonCv = await prisma.person_cv.update({
            where: { id_person_cv: parseInt(id, 10) },
            data: { id_status: estado },
        });
        res.json(updatedPersonCv);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el person_cv' });
    }
};

export const deletePersonCv = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    try {
        await prisma.person_cv.delete({
            where: { id_person_cv: parseInt(id, 10) },
        });
        res.json({ message: 'Person_cv eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el person_cv' });
    }
};
