import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout'

export default function Home(){
  return(
    <Layout>
      <h1>
        Inicio
      </h1>
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