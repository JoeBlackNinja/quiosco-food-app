import Image from "next/image";

import { formatCurrency } from "../helpers/currencyFormat";

import useQuiosco from "../hooks/useQuiosco";

const Product = ({ product }) => {

  const { name, image, price } = product;

  const { 
    handleSetProductUS, 
    productUS, 
    handleSetModal,
    modal
  } = useQuiosco();

  return (
    <div className="border p-3">
      <Image 
        width={300}
        height={400}
        src={`/assets/img/${image}.jpg`} 
        alt={`Dish Image ${name}`}
      />
      <div className="p-5">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(price)}
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-500
        text-white w-full mt-5 p-3 uppercase font-bold"
        onClick={() => {
          handleSetProductUS(product)
          handleSetModal()
        }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Product;
