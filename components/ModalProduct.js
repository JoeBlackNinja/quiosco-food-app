import { useState, useEffect } from "react";

import Image from "next/image";

import { formatCurrency } from '../helpers/currencyFormat'

import useQuiosco from "../hooks/useQuiosco";

const ModalProduct = () => {
  
    const [quantity, setQuantity] = useState(1);
    const [edit, setEdit] = useState(false);
    const { productUS, handleSetModal, handleSetOrder, order } = useQuiosco();

    useEffect( () => {
        if(order.some((orderState) => orderState.id === productUS.id )) {
            const productToEdit = order.find( (orderState) => orderState.id === productUS.id );
            setQuantity(productToEdit.quantity);
            setEdit(true);
        }
    }, [order])

    

  return (
    <div className="md:flex gap-10">

      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`image product ${productUS.name}`}
          src={`/assets/img/${productUS.image}.jpg`}
        />
      </div>

      <div className="md:w-2/3">

        <div className="flex justify-end">
            <button
                onClick={handleSetModal}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}>
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M6 18L18 6M6 6l12 12" 
                    />
                </svg>
            </button>
        </div>
        
        <h1 className="text-3xl font-bold mt-5">
            {productUS.name}
        </h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
            {formatCurrency(productUS.price)}
        </p>

        <div className="flex gap-4 mt-5">
            <button
                type="button"
                onClick={ () => quantity >= 1 && setQuantity(quantity - 1)}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-7 w-7" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}>
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                </svg>
            </button>

            <p className="text-3xl">
                {quantity}
            </p>

            <button
                type='button'
                onClick={ () => quantity <= 9 && setQuantity(quantity + 1)}
            >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            </button>
        </div>
            <button 
                type='button'
                className="mt-5 px-5 py-2 bg-violet-600 hover:bg-violet-800
                flex justify-center rounded-md text-2xl font-bold text-white uppercase"
                onClick={() => handleSetOrder({...productUS, quantity})}
            >
                {edit ? 'Save changes' : 'Add to order' }
            </button>        
      </div>
    </div>
  );
};

export default ModalProduct;
