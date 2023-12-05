
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOffer = async (_req:any, res:any) => {
    const { userId, title, description } = _req.body;
    try {
        //obtener el listado de user_company y verficar que el userId exista en la tabla
        const company = await prisma.company.findFirst({
            where: {
                id_user: userId,
            },
        });
        if (!company) {
            return res.status(404).json({ message: 'La compania no existe' });
        }
        //crear la oferta del modelo offert con status 1
        const offer = await prisma.offert.create({
            data: {
                title,
                description: description || '',
                company: {
                    connect: {
                        id_company: company.id_company,
                    },
                },
                status: {
                    connect: {
                        id_status: 1,
                    },
                },
            },
        });
        res.status(201).json({ message: 'Oferta creada exitosamente',data: offer});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la oferta' });
    }
};




export const listOffers = async (_req:any, res:any) => {
    try {
        const offers = await prisma.offert.findMany();
        res.status(200).json(offers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las ofertas' });
    }
}