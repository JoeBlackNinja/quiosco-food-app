//Utiliza la consulta en la API al manejar estados Redu<, useState, 
//useContext -- BUENAS PRACTICAS

import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  
  const prisma = new PrismaClient();

  const categories = await prisma.category.findMany({
    include:{
      products: true,
    }
  });

  res.status(200).json(categories);
}

