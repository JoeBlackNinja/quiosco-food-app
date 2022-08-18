import { PrismaClient } from '@prisma/client';

export default async function handler(req, res){

    const prisma = new PrismaClient();

    const { name, date, total, receive } = req.body;

    if(req.method === 'POST'){
        const orderWrite = await prisma.order.create({
            data:{
                name, 
                date, 
                total, 
                receive
            }
        });
        res.json(orderWrite.id);
    }
}