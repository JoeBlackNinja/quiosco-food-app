import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout'

import useQuiosco from '../hooks/useQuiosco'

export default function Home(){

  const { currentCategory } = useQuiosco();

  console.log(currentCategory, 'Cantilever');

  return(
    <Layout page={`Menu-${currentCategory?.name}`}>
      <h1 className='text-4xl font-black'>
        {currentCategory?.name}
      </h1>
      <p className='text-2xl mt-10'>
        Elige y personaliza tu pedido a continuación
      </p>
    </Layout>
  )
}









//Utiliza getServerSideProps cuando requieras solo consultar la info
//en la BBDD para mostrar

//import { PrismaClient } from '@prisma/client'

/*
export const getServerSideProps = async () => {
  const prisma = new PrismaClient();

  //Examples if ORM Prisma methods
  
  const categories = await prisma.category.findMany();
  
  const categories_ = await prisma.category.findFirst({
    where:{
      name: 'Pizzas',
    }
  });

  return {
    props:{
      categories,
    }
  }
}

*/